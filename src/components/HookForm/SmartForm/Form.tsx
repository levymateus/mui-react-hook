import React from 'react';
import useForm, { FormContext } from 'react-hook-form';

interface Props {
	id: string;
	/**
	 * As an optional argument to populate default values for the entire form.
	 * @see https://react-hook-form.com/api
	 */
	defaultValues?: Record<string, string | number | boolean>;
	onSubmit: (data: Record<string, string | number | boolean>) => void;
}

const Form: React.FC<Props> = ({ id, defaultValues, children, onSubmit }) => {
	const methods = useForm({ defaultValues, nativeValidation: true });

	return (
		<FormContext {...methods}>
			<form noValidate id={id} onSubmit={methods.handleSubmit(onSubmit)}>
				{children}
			</form>
		</FormContext>
	);
};

export default Form;
