import { FormGroup, FormLabel, Rating, FormHelperText } from "@mui/material";

export type RatingFieldProps = {
  id: string;
  name: string;
  label: string;
  value: number | null;
  max?: number;
  precision?: number;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: number | null) => void;
};

export default function RatingField(props: RatingFieldProps) {
	const { id, name, label, value, max, precision, helperText, error = null, touched = false, onChange } = props;

	const showError = touched && !!error;
	const helper = showError ? error : helperText;

  return (
    <FormGroup>
      <FormLabel htmlFor={id} className="block font-medium mb-1">
        {label}
      </FormLabel>
      <Rating
        id={id}
        name={name}
        value={value}
        max={max}
        precision={precision}
        onChange={(_e, newValue) => onChange(newValue)}
      />
      {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
    </FormGroup>
  );
}
