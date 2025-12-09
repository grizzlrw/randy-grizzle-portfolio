import { FormGroup, FormLabel, FormHelperText, TextField, Autocomplete } from "@mui/material";

export type AutocompleteOption<T = string> = {
  value: T;
  label: string;
};

type AutocompleteFieldProps<T = string> = {
  id: string;
  name: string;
  label: string;
  value: AutocompleteOption<T> | null;
  options: AutocompleteOption<T>[];
  placeholder?: string;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: AutocompleteOption<T> | null) => void;
};

export default function AutocompleteField<T = string>(props: AutocompleteFieldProps<T>) {
	const { id, name, label, value, options, placeholder, helperText, error = null, touched = false, onChange } = props;

	const showError = touched && !!error;
	const helper = showError ? error : helperText;

  return (
    <FormGroup>
      <FormLabel htmlFor={id} className="block font-medium mb-1">
        {label}
      </FormLabel>
      <Autocomplete
        id={id}
        options={options}
        value={value}
        onChange={(_e, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            placeholder={placeholder}
            error={showError}
            helperText={helper}
          />
        )}
      />
    </FormGroup>
  );
}
