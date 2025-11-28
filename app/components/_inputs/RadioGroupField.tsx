import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";

export type RadioOption<T = string> = {
  value: T;
  label: string;
};

export type RadioGroupFieldProps<T = string> = {
  id: string;
  name: string;
  label: string;
  value: T;
  options: RadioOption<T>[];
  row?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: T) => void;
};

export default function RadioGroupField<T = string>(props: RadioGroupFieldProps<T>) {
  const {
    id,
    name,
    label,
    value,
    options,
    row = false,
    required = false,
    helperText,
    error = null,
    touched = false,
    onChange,
  } = props;

  const showError = touched && !!error;
  const helper = showError ? error : helperText;

  return (
    <FormControl error={showError}>
      <FormLabel id={`${id}-label`} required={required}>
        {label}
      </FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby={`${id}-label`}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={String(option.value)}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
    </FormControl>
  );
}
