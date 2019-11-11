import DateFnsUtils from '@date-io/date-fns';
import {
	KeyboardDatePicker,
	KeyboardDatePickerProps,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface DatePickerProps
	extends Omit<KeyboardDatePickerProps, 'onChange' | 'value'> {
	name: string;
	label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, label, ...rest }) => {
	const { register, setValue } = useFormContext();
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date()
	);
	const handleDateChange = (date: Date | null): void => {
		setSelectedDate(date);
		setValue(name, date);
	};
	React.useEffect(() => {
		register({ name, type: 'text' });
		setValue(name, selectedDate);
	}, [name, register, selectedDate, setValue]);
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				name={name}
				label={label}
				value={selectedDate}
				onChange={handleDateChange}
				variant="inline"
				format="dd/MM/yyyy"
				margin="normal"
				inputVariant="filled"
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
				{...rest}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;
