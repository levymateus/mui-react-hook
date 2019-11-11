import React from 'react';
import MaskedInput from 'react-text-mask';

export interface TextMaskCustomProps {
	inputRef: (ref: HTMLInputElement | null) => void;
}

export function CPFMask(props: TextMaskCustomProps): JSX.Element {
	const { inputRef, ...other } = props;
	const mask = [
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'-',
		/[0-9]/,
		/[0-9]/,
	];
	return (
		<MaskedInput
			{...other}
			ref={(ref: MaskedInput): void => {
				inputRef(ref ? (ref.inputElement as HTMLInputElement) : null);
			}}
			mask={mask}
			placeholder="000.000.000-00"
		/>
	);
}

export function CellPhoneMask(props: TextMaskCustomProps): JSX.Element {
	const { inputRef, ...other } = props;
	const mask = [
		'(',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		')',
		' ',
		'9',
		' ',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'-',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
	];
	return (
		<MaskedInput
			{...other}
			ref={(ref: MaskedInput): void => {
				inputRef(ref ? (ref.inputElement as HTMLInputElement) : null);
			}}
			mask={mask}
			placeholder="(999) 9 999-9999"
		/>
	);
}
