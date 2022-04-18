import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function VitalSignForm({
	patient,
	onSubmit,
	vitalSign,
	error,
	setError,
	setVitalSign,
	isEdit,
}) {
	const { bodyTemperature, bloodPressure, heartRate, visitDate } = vitalSign;

	const onChange = (e) => {
		setVitalSign((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const resetForm = () => {
		setVitalSign((prev) => ({
			...prev,
			bodyTemperature: '',
			bloodPressure: '',
			heartRate: '',
			visitDate: '',
		}));
		setError('');
	};

	return (
		<Form onSubmit={onSubmit}>
			<Form.Group className="mb-2">
				<Form.Label>Patient</Form.Label>
				<Form.Control
					type="text"
					name="patient"
					value={patient.name}
					disabled
					readOnly
				/>
			</Form.Group>

			<Form.Group className="mb-2">
				<Form.Label>Body Temperature (Celsius)</Form.Label>
				<Form.Control
					type="number"
					name="bodyTemperature"
					value={bodyTemperature}
					onChange={onChange}
					required
					step=".01"
					min="0"
					max="100"
				/>
			</Form.Group>

			<Form.Group className="mb-2">
				<Form.Label>Blood Pressure (mmHg)</Form.Label>
				<Form.Control
					type="number"
					name="bloodPressure"
					value={bloodPressure}
					onChange={onChange}
					required
					min="0"
					max="200"
				/>
			</Form.Group>

			<Form.Group className="mb-2">
				<Form.Label>Heart Rate (BPM)</Form.Label>
				<Form.Control
					type="number"
					name="heartRate"
					value={heartRate}
					onChange={onChange}
					required
					min="0"
					max="200"
				/>
			</Form.Group>

			<Form.Group className="mb-2">
				<Form.Label>Visit Date</Form.Label>
				<Form.Control
					type="datetime-local"
					name="visitDate"
					value={visitDate}
					onChange={onChange}
					required
				/>
			</Form.Group>

			{error && <Form.Text className="text-danger">{error}</Form.Text>}

			<div className="d-flex gap-2 pt-3">
				<Button type="submit">Submit</Button>
				{!isEdit && (
					<Button
						type="reset"
						variant="outline-secondary"
						onClick={() => resetForm()}>
						Reset
					</Button>
				)}
			</div>
		</Form>
	);
}
export default VitalSignForm;
