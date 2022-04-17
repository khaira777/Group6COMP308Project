import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { VITAL_SIGN_MUTATION, VITAL_SIGN_QUERY } from '../graphql/vital-sign';
import useAuth from '../hooks/useAuth';
import PatientSearch from './PatientSearch';
import PatientVisitRecords from './PatientVisitRecords';

function VitalSignsForm() {
	const initialVitalSign = {
		bodyTemperature: '',
		bloodPressure: '',
		heartRate: '',
		visitDate: '',
	};

	const [vitalSign, setVitalSign] = useState(initialVitalSign);
	const [vitalSigns, setVitalSigns] = useState([]);
	const [patient, setPatient] = useState(null);
	const [error, setError] = useState('');
	const { bloodPressure, heartRate, bodyTemperature, visitDate } = vitalSign;
	const { user } = useAuth();
	const [addVitalSigns] = useMutation(VITAL_SIGN_MUTATION.ADD_VITAL_SIGN);
	const [queryVitalSigns] = useLazyQuery(VITAL_SIGN_QUERY.GET_VITAL_SIGNS, {
		onCompleted: (data) => {
			if (data) {
				setVitalSigns(data.getVitalSigns);
			}
		},
	});

	useEffect(() => {
		if (vitalSign.visitDate === '') {
			setVitalSign((prev) => ({ ...prev, visitDate: getToday() }));
		}
	}, [vitalSign.visitDate]);

	useEffect(() => {
		if (patient) {
			queryVitalSigns({ variables: { patientId: patient?._id } });
		}
	}, [patient, queryVitalSigns]);

	const getToday = () => {
		const date = new Date();
		const localOffset = date.getTimezoneOffset() * 60000;
		const today = new Date(date.getTime() - localOffset)
			.toISOString()
			.substring(0, 16);

		return today;
	};

	const onChange = (e) => {
		setVitalSign((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const checkIsDateAfterToday = (date) => {
		const today = new Date();
		const dateToCheck = new Date(date);
		return dateToCheck > today;
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const isDateAfterToday = checkIsDateAfterToday(visitDate);
			if (isDateAfterToday) {
				throw new Error('Visit date cannot be in the future');
			}

			const vitalSignInput = {
				bodyTemperature: parseFloat(bodyTemperature),
				bloodPressure: parseInt(bloodPressure),
				heartRate: parseInt(heartRate),
				visitDate,
				patientId: patient._id,
				nurseId: user._id,
			};

			await addVitalSigns({
				variables: {
					vitalSignInput,
				},
			});

			setError('');
			setVitalSign(initialVitalSign);
		} catch (error) {
			setError(error?.message);
		}
	};

	return (
		<Container className="mt-3">
			<Row>
				<h3>Vital Signs</h3>
			</Row>

			<Row>
				<PatientSearch setPatient={setPatient} />
			</Row>

			<Dropdown.Divider className="my-4" />

			{patient && (
				<Row>
					<Col xs={12} lg={5} className="mb-3">
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
								<Button
									type="reset"
									variant="outline-secondary"
									onClick={() => setVitalSign(initialVitalSign)}>
									Reset
								</Button>
							</div>
						</Form>
					</Col>

					<Col xs={12} lg={7}>
						<PatientVisitRecords patient={patient} vitalSigns={vitalSigns} />
					</Col>
				</Row>
			)}
		</Container>
	);
}
export default VitalSignsForm;
