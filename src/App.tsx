import { Button } from '@material-ui/core';
import 'date-fns';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import Form from './components/HookForm/SmartForm';
import { DatePicker, Input, TimePicker } from './components/Inputs';

const App: React.FC = () => {
	const handleSubmit = (
		data: Record<string, string | number | boolean>
	): void => {
		console.log(data);
	};
	return (
		<>
			<Form id="person-form" onSubmit={handleSubmit}>
				<Input label="Name" name="name" required />
				<DatePicker name="date" label="Datepicker" required />
				<TimePicker name="time" label="Timer" required />
				<Button type="submit">Enviar</Button>
			</Form>
		</>
	);
};

export default hot(App);
