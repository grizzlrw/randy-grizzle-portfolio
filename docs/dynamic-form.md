# Dynamic Form Architecture

This document explains how the dynamic form system works in this project, and how the pieces fit together.

## Overview

The dynamic form is built around three key concepts:

- **Field schema**: an array of `DynamicFieldConfig` objects describing what fields exist.
- **Form engine**: `DynamicForm`, which uses React Hook Form to manage values and validation.
- **Dumb inputs**: reusable `_inputs` components (e.g. `InputField`, `SelectField`) that only know about props, not validation logic.

At a high level:

- A page supplies `fields: DynamicFieldConfig[]` and an `onSubmit(values)` callback.
- `DynamicForm` uses React Hook Form to track values and apply validation rules.
- `DynamicForm` renders the right `_inputs` for each field and passes them `value`, `onChange`, `onBlur`, `touched`, and `error`.
- When the user submits, `onSubmit` receives a plain `values` object.

---

## Field Schema: `DynamicFieldConfig`

File: `app/components/_dynamic-form/dynamic-form.tsx`

```ts
export type DynamicFieldType =
  | "text"
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
```

- `name`: the key for this field in the values object (`values[name]`).
- `type`: which kind of control to render (`"text"`, `"select"`, `"slider"`, etc.).
- `label`: label shown to the user.
- `placeholder`: hint text for text-like inputs.
- `options`: used by selects, radios, and autocompletes.
- `min` / `max` / `step`: numeric hints for number/slider/rating.
- `defaultValue`: per-field default value if nothing else is supplied.
- `rules`: validation rules in React Hook Form format (e.g. `required`, `pattern`).

The schema is **pure description**: it has no React state or UI logic.

---

## Values: `DynamicFieldValues`

```ts
export type DynamicFieldValues = Record<string, unknown>;
```

This represents the **data** managed by the form:

- Keys are field `name`s.
- Values are whatever each control produces (strings, booleans, numbers, etc.).

Example `values`:

```ts
{
  name: "Ada Lovelace",
  email: "ada@example.com",
  role: "senior",
  newsletter: true,
  experience: 5,
  availability: false,
  hoursPerWeek: 20,
  favoriteTech: "typescript",
  excitement: 4,
}
```

This is what `onSubmit` receives.

---

## `DynamicForm` API

```ts
export type DynamicFormProps = {
  fields: DynamicFieldConfig[];
  defaultValues?: Partial<DynamicFieldValues>;
  onSubmit: (values: DynamicFieldValues) => void;
  submitLabel?: string;
  spacing?: number;
};
```

- `fields`: array of field configs (`DynamicFieldConfig[]`).
- `defaultValues`: optional initial values for fields.
- `onSubmit(values)`: callback that receives the validated values object.
- `submitLabel`: label for the submit button (defaults to `"Submit"`).
- `spacing`: vertical spacing between fields (passed to MUI `Stack`).

`DynamicForm` is declared in `app/components/_dynamic-form/dynamic-form.tsx` and is responsible for:

- Creating a React Hook Form instance.
- Rendering each field using a `Controller`.
- Adapting `DynamicFieldConfig` + React Hook Form state into `_inputs` props.
- Handling form submission and calling `onSubmit(values)`.

---

## React Hook Form Integration

Inside `DynamicForm`:

```ts
const {
  control,
  handleSubmit,
  formState: { isSubmitting },
} = useForm<DynamicFieldValues>({
  defaultValues: defaultValues as unknown as DynamicFieldValues,
});
```

- `useForm` holds the internal form state.
- `handleSubmit(onSubmit)` is attached to the form element:

```tsx
<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
  {/* fields + submit button */}
</Box>
```

When the user submits:

1. Browser fires the form `submit` event.
2. React Hook Form intercepts it via `handleSubmit`.
3. It validates all registered fields using their `rules`.
4. If valid, it builds a `DynamicFieldValues` object and calls `onSubmit(values)`.

You do **not** manage individual `useState` hooks per field.

---

## Rendering Fields: `Controller` + `renderField`

Each non-section field config is rendered by a React Hook Form `Controller`:

```tsx
{fields.map((fieldConfig) => {
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

  // section: render a region and its child fields
  const sectionChildren = fieldConfig.children ?? [];
  const headingId = `${fieldConfig.name}-heading`;

  return (
    <Box
      key={fieldConfig.name}
      component="section"
      aria-labelledby={headingId}
      sx={{ border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}
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
            rules={childConfig.rules}
            defaultValue={
              ( // nested defaults via dot-notation
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
```

`Controller` provides:

- `field` with:
  - `name`: the field name.
  - `value`: current value.
  - `onChange(value)`: updates the field value.
  - `onBlur()`: marks the field as touched and triggers validation.
- `fieldState` with:
  - `isTouched`: whether the user has interacted with the field.
  - `error`: validation error (if any), including `error.message`.

These are passed into a helper function `renderField` that chooses the right `_inputs` component.

### `renderField`: Schema → Dumb Input Props

`renderField` stitches together three things:

- `config`: field schema.
- `field`: value and handlers from React Hook Form.
- `fieldState`: validation/touched state.

It computes simple props to pass to the `_inputs` components:

```ts
type RenderFieldArgs = {
  config: DynamicFieldConfig;
  field: {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  };
  fieldState: {
    isTouched: boolean;
    error?: { message?: string } | undefined;
  };
};

function renderField({ config, field, fieldState }: RenderFieldArgs): ReactElement {
  const isRequired = Boolean(config.rules && (config.rules as { required?: unknown }).required);

  const commonProps = {
    id: config.name,
    name: field.name,
    label: config.label,
    required: isRequired,
    touched: fieldState.isTouched,
    error: fieldState.error?.message ?? null,
  } as const;

  switch (config.type) {
    case "text":
    case "email":
    case "password": {
      return (
        <InputField
          {...commonProps}
          type={config.type}
          value={(field.value as string | undefined) ?? ""}
          placeholder={config.placeholder}
          onChange={(value: string) => field.onChange(value)}
          onBlur={field.onBlur}
        />
      );
    }

    // other cases: select, checkbox, radio, number, switch, slider,
    // autocomplete, rating
  }
}
```

Important points:

- `isRequired` is derived from `rules.required` and passed as a simple `required` boolean for UI/HTML semantics.
- `touched` and `error` come from React Hook Form and control when/how `_inputs` display validation feedback.
- Each input type maps `field.value` into whatever its `_inputs` component expects (string, boolean, number, option object, etc.).

`renderField` is the **only** place that knows about both React Hook Form and your `_inputs`.

---

## Dumb Inputs: `_inputs` Components

Example: `InputField` (`app/components/_inputs/InputField.tsx`):

```ts
export type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value: string;
  required?: boolean;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};
```

- No React Hook Form imports.
- No knowledge of `rules` or validation engines.
- Only uses `value`, `onChange`, `onBlur`, `required`, `touched`, and `error` to render UI.

This keeps `_inputs` **presentational and reusable** across forms.

---

## Using the Dynamic Form on a Page

Example page: `app/(pages)/forms-dynamic/page.tsx`:

```tsx
const fields: DynamicFieldConfig[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Ada Lovelace",
    rules: { required: "Name is required" },
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  // ...other fields
];

export default function DynamicFormsPage() {
  return (
    <Box sx={{ width: "100%", maxWidth: 960, mx: "auto", py: 8, px: 2 }}>
      <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
        Dynamic Form (React Hook Form)
      </Typography>

      <Typography component="p" sx={{ mb: 4 }}>
        This page demonstrates a dynamic form driven by a field configuration
        schema, rendered through shared input components and managed by React
        Hook Form.
      </Typography>

      <DynamicForm
        fields={fields}
        onSubmit={(values) => {
          console.log("Dynamic form submitted", values);
          // Use values here: call APIs, update state, navigate, etc.
        }}
        submitLabel="Submit"
      />
    </Box>
  );
}
```

From the page's perspective:

- You define a `fields` array describing the form.
- You provide `onSubmit(values)` to handle the data.
- You do **not** manage individual inputs or validation; `DynamicForm` and React Hook Form do that.

---

## Summary

- **Configs in**: `DynamicFieldConfig[]` defines what the form looks like and how it should validate.
- **Engine**: `DynamicForm` + React Hook Form manage values, touched state, and errors.
- **Dumb inputs**: `_inputs` render UI based only on props like `value`, `required`, `touched`, and `error`.
- **Values out**: `onSubmit(values)` receives a plain object describing what the user entered.

This separation keeps your forms flexible, testable, and easy to extend—whether the field schema comes from code, a database, or a CMS.