import { FormGroup, FormLabel, Slider, FormHelperText } from "@mui/material";

export type SliderFieldProps = {
  id: string;
  name: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
  error?: string | null;
  touched?: boolean;
  onChange: (value: number) => void;
};

export default function SliderField(props: SliderFieldProps) {
	const { id, name, label, value, min, max, step, helperText, error = null, touched = false, onChange } = props;

	const showError = touched && !!error;
	const helper = showError ? error : helperText;

  return (
    <FormGroup>
      <FormLabel htmlFor={id} className="block font-medium mb-1">
        {label}
      </FormLabel>
      <Slider
        id={id}
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_e, newValue) => onChange(newValue as number)}
      />
      {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
    </FormGroup>
  );
}
