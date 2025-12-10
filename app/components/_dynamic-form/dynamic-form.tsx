"use client";

import { ReactElement } from "react";
import { useForm, Controller, RefCallBack } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import InputField from "@/app/components/_inputs/InputField";
import SelectField, { SelectOption } from "@/app/components/_inputs/SelectField";
import CheckboxField from "@/app/components/_inputs/CheckboxField";
import RadioGroupField, { RadioOption } from "@/app/components/_inputs/RadioGroupField";
import NumberField from "@/app/components/_inputs/NumberField";
import SwitchField from "@/app/components/_inputs/SwitchField";
import SliderField from "@/app/components/_inputs/SliderField";
import AutocompleteField, { AutocompleteOption } from "@/app/components/_inputs/AutocompleteField";
import RatingField from "@/app/components/_inputs/RatingField";

export type DynamicFieldType =
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "select"
  | "checkbox"
  | "radio"
  | "number"
  | "switch"
  | "slider"
  | "autocomplete"
  | "rating"
  | "section";

export type DynamicFieldConfig = {
  name: string;
  type: DynamicFieldType;
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: unknown;
  /** React Hook Form-compatible validation rules */
  rules?: Record<string, unknown>;

  // Optional, for composite/section fields
  heading?: string;
  description?: string;
  children?: DynamicFieldConfig[];
};

export type DynamicFieldValues = Record<string, unknown>;

export type DynamicFormProps = {
  fields: DynamicFieldConfig[];
  defaultValues?: Partial<DynamicFieldValues>;
  onSubmit: (values: DynamicFieldValues) => void;
  submitLabel?: string;
  spacing?: number;
};

export default function DynamicForm(props: DynamicFormProps) {
  const { fields, defaultValues, onSubmit, submitLabel = "Submit", spacing = 3 } = props;

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<DynamicFieldValues>({
    defaultValues: defaultValues as unknown as DynamicFieldValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const onValid = (values: DynamicFieldValues) => {
    console.log("Form valid submission:", values);
    onSubmit(values);
  };

  const onInvalid = () => {
    console.log("Form invalid submission:", errors);
    const firstErrorFieldName = Object.keys(errors)[0];
    if (!firstErrorFieldName) return;

    setFocus(firstErrorFieldName);
    
    const el = document.querySelector<HTMLElement>(
      `[data-field-name="${firstErrorFieldName}"]`
    );
    if (el) {
      // const focusable =
      //   el.querySelector<HTMLElement>("input, textarea, select, button, [tabindex]");
      // focusable?.focus();
      el.focus();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onValid, onInvalid)} noValidate sx={{ width: "100%" }}>
      <Stack spacing={spacing}>
        {fields.map((rawFieldConfig) => {
          // Normalize pattern rule from DB: pattern.value (string) -> RegExp once, per field
          const fieldConfig: DynamicFieldConfig = {
            ...rawFieldConfig,
            rules: normalizeRules(rawFieldConfig.rules),
          };

          if (fieldConfig.type !== "section") {
            return (
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name as keyof DynamicFieldValues}
                control={control}
                rules={fieldConfig.rules}
                defaultValue={
                  (defaultValues?.[fieldConfig.name] ??
                    fieldConfig.defaultValue ??
                    getDefaultValueForType(fieldConfig.type)) as unknown
                }
                render={({ field, fieldState }) =>
                  renderField({ config: fieldConfig, field, fieldState })
                }
              />
            );
          }

          const sectionChildren = fieldConfig.children ?? [];
          const headingId = `${fieldConfig.name}-heading`;

          return (
            <Box
              key={fieldConfig.name}
              component="section"
              aria-labelledby={headingId}
              // sx={{ border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}
            >
              <Stack spacing={2}>
                <Box>
                  <h2 id={headingId} className="text-lg font-semibold mb-1">
                    {fieldConfig.heading ?? fieldConfig.label}
                  </h2>
                  {fieldConfig.description && (
                    <p className="text-sm text-gray-600">{fieldConfig.description}</p>
                  )}
                </Box>

                {sectionChildren.map((childConfig) => (
                  <Controller
                    key={`${fieldConfig.name}.${childConfig.name}`}
                    name={`${fieldConfig.name}.${childConfig.name}` as keyof DynamicFieldValues}
                    control={control}
                    rules={normalizeRules(childConfig.rules)}
                    defaultValue={
                      ( // nested default: defaultValues?.shipping?.city etc.
                        ((defaultValues?.[fieldConfig.name] as Record<string, unknown> | undefined)?.[
                          childConfig.name
                        ] ?? childConfig.defaultValue ?? getDefaultValueForType(childConfig.type)) as unknown
                      )
                    }
                    render={({ field, fieldState }) =>
                      renderField({ config: childConfig, field, fieldState })
                    }
                  />
                ))}
              </Stack>
            </Box>
          );
        })}

        <Box sx={{ pt: 2 }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function getDefaultValueForType(type: DynamicFieldType): unknown {
  switch (type) {
    case "checkbox":
    case "switch":
      return false;
    case "number":
    case "slider":
    case "rating":
      return 0;
    default:
      return "";
  }
}

type RenderFieldArgs = {
  config: DynamicFieldConfig;
  field: {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    ref: RefCallBack;
  };
  fieldState: {
    isTouched: boolean;
    error?: { message?: string | undefined } | undefined;
  };
};

// Ensure React Hook Form receives a proper pattern rule: value must be a RegExp, not a string
function normalizeRules(rules?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!rules) return rules;

  type PatternRule = {
    value: string | RegExp;
    message?: string;
    [key: string]: unknown;
  };

  type RulesWithPattern = Record<string, unknown> & {
    pattern?: PatternRule;
  };

  const typedRules = rules as RulesWithPattern;

  if (typedRules.pattern && typeof typedRules.pattern.value === "string") {
    typedRules.pattern = {
      ...typedRules.pattern,
      value: new RegExp(typedRules.pattern.value),
    };
  }

  return rules;
}

function renderField({ config, field, fieldState }: RenderFieldArgs): ReactElement {
  const isRequired = Boolean(config.rules && (config.rules as { required?: unknown }).required);

  const commonProps = {
    id: config.name,
    name: field.name,
    label: config.label,
    required: isRequired,
    touched: fieldState.isTouched,
    error: fieldState.error?.message ?? null,
    dataFieldName: config.name
  } as const;

  switch (config.type) {
    case "text":
    case "email":
    case "password":
    case "textarea": {
      const isTextarea = config.type === "textarea";
      return (
        <InputField
          {...commonProps}
          type={config.type}
          value={(field.value as string | undefined) ?? ""}
          placeholder={config.placeholder}
          onChange={(value: string) => field.onChange(value)}
          onBlur={field.onBlur}
          multiline={isTextarea}
          minRows={isTextarea ? 3 : undefined}
          maxRows={isTextarea ? 6 : undefined}
          inputRef={field.ref}
        />
      );
    }

    case "select": {
      const options: SelectOption[] = config.options ?? [];
      return (
        <SelectField
          {...commonProps}
          value={(field.value as string | number | undefined) ?? ""}
          options={options}
          placeholder={config.placeholder}
          onChange={(value) => field.onChange(value)}
          onBlur={field.onBlur}
          inputRef={field.ref}
        />
      );
    }

    case "checkbox": {
      return (
        <CheckboxField
          {...commonProps}
          checked={!!field.value}
          onChange={(checked) => field.onChange(checked)}
        />
      );
    }

    case "radio": {
      const options: RadioOption[] = config.options ?? [];
      return (
        <RadioGroupField
          {...commonProps}
          value={field.value ?? ""}
          options={options}
          onChange={(value) => field.onChange(value)}
        />
      );
    }

    case "number": {
      return (
        <NumberField
          {...commonProps}
          value={typeof field.value === "number" ? field.value : ""}
          placeholder={config.placeholder}
          min={config.min}
          max={config.max}
          step={config.step}
          onChange={(value) => field.onChange(value)}
        />
      );
    }

    case "switch": {
      return (
        <SwitchField
          {...commonProps}
          checked={!!field.value}
          onChange={(checked) => field.onChange(checked)}
        />
      );
    }

    case "slider": {
      return (
        <SliderField
          {...commonProps}
          value={typeof field.value === "number" ? field.value : 0}
          min={config.min}
          max={config.max}
          step={config.step}
          onChange={(value) => field.onChange(value)}
        />
      );
    }

    case "autocomplete": {
      const options: AutocompleteOption[] = config.options ?? [];
      const selected =
        options.find((opt) => opt.value === field.value) ?? null;

      return (
        <AutocompleteField
          {...commonProps}
          value={selected}
          options={options}
          placeholder={config.placeholder}
          onChange={(option) => field.onChange(option?.value ?? "")}
        />
      );
    }

    case "rating": {
      return (
        <RatingField
          {...commonProps}
          value={typeof field.value === "number" ? field.value : 0}
          max={config.max}
          onChange={(value) => field.onChange(value)}
        />
      );
    }

    default:
      return <></>;
  }
}