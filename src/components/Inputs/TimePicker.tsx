import DateFnsUtils from '@date-io/date-fns';
import {
	KeyboardTimePicker,
	KeyboardTimePickerProps,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TimePickerProps
	extends Omit<KeyboardTimePickerProps, 'onChange' | 'value'> {
	name: string;
	label: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ name, label, ...rest }) => {
	const { register, setValue } = useFormContext();
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date()
	);
	const handleDateChange = (date: Date | null): void => {
		setSelectedDate(date);
		setValue(name, date);
	};
	React.useEffect(() => {
		register({ name });
		setValue(name, selectedDate);
	}, [name, register, selectedDate, setValue]);
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
				name={name}
				label={label}
				value={selectedDate}
				onChange={handleDateChange}
				margin="normal"
				inputVariant="filled"
				ampm={false}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
				{...rest}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default TimePicker;
