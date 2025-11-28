import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

export type SelectOption<T extends string | number = string> = {
  value: T;
  label: string;
};

export type SelectFieldProps<T extends string | number = string> = {
  id: string;
  name: string;
  label: string;
  value: T;
  options: SelectOption<T>[];
  placeholder?: string;
  className?: string;
  required?: boolean;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: T) => void;
  onBlur?: () => void;
};

export default function SelectField<T extends string | number = string>(props: SelectFieldProps<T>) {
  const {
    id,
    name,
    label,
    value,
    options,
    placeholder,
    required = false,
    helperText,
    error = null,
    touched = false,
    onChange,
    onBlur,
    className,
  } = props;

  const showError = touched && !!error;
  const helper = showError ? error : helperText;

  return (
    <FormControl fullWidth error={showError} className={className}>
      <InputLabel id={`${id}-label`} required={required}>
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        onBlur={onBlur}
        required={required}
        displayEmpty
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={String(option.value)} value={option.value as string | number}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
    </FormControl>
  );
}
