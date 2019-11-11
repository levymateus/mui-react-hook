import TextField, { FilledTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
	name: string;
	label: string;

	// Validation properties
	required?: boolean;
	pattern?: RegExp;
}

const Input: React.FC<Props & Omit<FilledTextFieldProps, 'variant'>> = ({
	name,
	label,

	// Validation properties
	required,
	pattern,
	...rest
}) => {
	const { register, errors } = useFormContext();

	return (
		<TextField
			inputRef={register({
				required,
				pattern,
			})}
			label={label}
			name={name}
			helperText={
				errors[name] &&
				(errors[name].ref as HTMLInputElement).validationMessage
			}
			error={errors[name] !== undefined}
			margin="normal"
			variant="filled"
			required={required}
			{...rest}
		/>
	);
};

export default Input;
