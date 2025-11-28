import { FormGroup, FormLabel, Input, FormHelperText } from "@mui/material";

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

export default function InputField(props: InputFieldProps) {
	const { id, name, label, placeholder, value, type = "text", required = false, helperText, error = null, touched = false, onChange, onBlur, className = "w-full border p-2 rounded"} = props;
	const showError = touched && !!error;
	const helper = showError ? error : helperText;
    
    return (
        <FormGroup>
            <FormLabel htmlFor={`${id}-input`} className="block font-medium mb-1">
                {label} {required && "*"}
            </FormLabel>
            <Input
            error={showError}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            id={`${id}-input`}
            name={name}
            className={className}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
            />
            {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
        </FormGroup>
        
    )
}