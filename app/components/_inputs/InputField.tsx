import { FormLabel, FormHelperText, TextField, FormControl } from "@mui/material";

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
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    onChange: (value: string) => void;
    onBlur?: () => void;
    dataFieldName?: string;
    inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
};

export default function InputField(props: InputFieldProps) {
	const { 
        id, 
        name, 
        label, 
        placeholder, 
        value, 
        type = "text", 
        required = false, 
        helperText, 
        error = null, 
        touched = false, 
        onChange, 
        onBlur, 
        className = "w-full border p-2 rounded",
        multiline,
        minRows,
        maxRows,
        dataFieldName,
        inputRef,
    } = props;
	const showError = touched && !!error;
	const helper = showError ? error : helperText;
    
    return (
        <FormControl fullWidth error={showError}>
            <FormLabel htmlFor={`${id}-input`} className="block font-medium mb-1">
                {label} {required && "*"}
            </FormLabel>
            <TextField
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
            multiline={multiline}
            minRows={multiline ? minRows : undefined}
            maxRows={multiline ? maxRows : undefined}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            slotProps={{ htmlInput: { "data-field-name": dataFieldName } } as any}
            inputRef={inputRef}
            />
            {helper && <FormHelperText error={showError}>{helper}</FormHelperText>}
        </FormControl>
        
    )
}