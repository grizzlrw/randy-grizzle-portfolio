import { FormGroup, FormLabel, Input, FormHelperText } from "@mui/material";

export type NumberFieldProps = {
  id: string;
  name: string;
  label: string;
  value: number | "";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  required?: boolean;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: number | "") => void;
};

export default function NumberField(props: NumberFieldProps) {
  const {
    id,
    name,
    label,
    value,
    placeholder,
    min,
    max,
    step,
    className = "w-full border p-2 rounded",
    required = false,
    helperText,
    error = null,
    touched = false,
    onChange,
  } = props;

  const showError = touched && !!error;
  const helper = showError ? error : helperText;

  return (
    <FormGroup>
      <FormLabel htmlFor={`${id}-input`} className="block font-medium mb-1">
        {label} {required && "*"}
      </FormLabel>
      <Input
			error={showError}
        type="number"
        id={`${id}-input`}
        name={name}
        className={className}
        placeholder={placeholder}
        required={required}
        inputProps={{ min, max, step }}
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          if (next === "") {
            onChange("");
          } else {
            const parsed = Number(next);
            onChange(Number.isNaN(parsed) ? "" : parsed);
          }
        }}
      />
		{helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
    </FormGroup>
  );
}
