import React from 'react';
import useForm, { FormContext } from 'react-hook-form';

export type FieldSet = number;

interface Props {
	id: string;
	fieldSets: FieldSet[];
	/**
	 * As an optional argument to populate default values for the entire form.
	 * @see https://react-hook-form.com/api
	 */
	defaultValues?: Record<string, string | number | boolean>;
	onSubmit: (data: Record<string, string | number | boolean>) => void;
}

const Form: React.FC<Props> = ({
	id,
	defaultValues,
	fieldSets,
	children,
	onSubmit,
}) => {
	const methods = useForm({ defaultValues });

	const handleSubmitProxy = (e: React.FormEvent<HTMLFormElement>): void => {
		if (methods.errors !== undefined) {
			methods.handleSubmit(onSubmit)(e);
		}
	};

	return (
		<FormContext {...methods}>
			<form noValidate id={id} onSubmit={handleSubmitProxy}>
				{fieldSets.map(index => {
					const child = React.Children.toArray(
						children
					)[0] as React.ReactElement;
					const name = `${child.props.name}.${index}`;
					const key = name;

					return child.props.name
						? React.createElement(child.type, {
								...child.props,
								index,
								key,
								name,
								form: id,
						  })
						: child;
				})}
				{React.Children.toArray(children).map(
					(child: React.ReactElement): React.ReactElement => {
						if (!(typeof child.props.children === 'object')) {
							return child.props.name
								? React.createElement(child.type, {
										...child.props,
										key: child.props.name,
								  })
								: child;
						}
						return null;
					}
				)}
			</form>
		</FormContext>
	);
};

export default Form;
