import { FormControlLabel, Checkbox, FormGroup, FormHelperText } from "@mui/material";

export type CheckboxFieldProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (checked: boolean) => void;
};

export default function CheckboxField(props: CheckboxFieldProps) {
	const { id, name, label, checked, helperText, error = null, touched = false, onChange } = props;

	const showError = touched && !!error;
	const helper = showError ? error : helperText;

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label={label}
      />
      {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
    </FormGroup>
  );
}
