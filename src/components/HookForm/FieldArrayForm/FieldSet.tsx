import { Button } from '@material-ui/core';
import classNames from 'classnames';
import React, { FieldsetHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import './fieldset.scss';

interface Props extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
	repeat?: boolean;
	index?: number;
	legend?: string;
	onRemove?: (index: number) => void;
}

const FieldSet: React.FC<Props> = ({
	index,
	legend,
	children,
	onRemove,
	...rest
}) => {
	const methods = useFormContext();
	return (
		<fieldset
			{...rest}
			className={classNames({
				'fieldset-component': true,
			})}
		>
			{legend && <legend>{legend}</legend>}
			{React.Children.toArray(children).map(
				(child: React.ReactElement) => {
					const errorRef =
						methods.errors[child.props.name] &&
						(methods.errors[child.props.name]
							.ref as HTMLInputElement);
					const name = `${rest.name}.${child.props.name}`;
					const key = name;

					return React.createElement(child.type, {
						...child.props,
						key,
						name,
						error: errorRef && errorRef.validationMessage,
					});
				}
			)}
			{onRemove && (
				<Button onClick={(): void => onRemove(index)}>Remove</Button>
			)}
		</fieldset>
	);
};

export default FieldSet;
