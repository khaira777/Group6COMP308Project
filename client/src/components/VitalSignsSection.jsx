import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import { VITAL_SIGN_MUTATION, VITAL_SIGN_QUERY } from '../graphql/vital-sign';
import useAuth from '../hooks/useAuth';
import useDate from '../hooks/useDate';
import PatientSearch from './PatientSearch';
import PatientVisitRecords from './PatientVisitRecords';
import VitalSignForm from './VitalSignForm';

const initialVitalSign = {
	bodyTemperature: '',
	bloodPressure: '',
	heartRate: '',
	visitDate: '',
};

function VitalSignsSection() {
	const [vitalSign, setVitalSign] = useState(initialVitalSign);
	const [vitalSigns, setVitalSigns] = useState([]);
	const [patient, setPatient] = useState(null);
	const [error, setError] = useState('');
	const { bloodPressure, heartRate, bodyTemperature, visitDate } = vitalSign;
	const { user } = useAuth();
	const { getToday, checkIsDateAfterToday } = useDate();
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
	}, [vitalSign.visitDate, getToday]);

	useEffect(() => {
		if (patient) {
			queryVitalSigns({ variables: { patientId: patient?._id } });
		}
	}, [patient, queryVitalSigns]);

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

			const addedVitalSigns = await addVitalSigns({
				variables: {
					vitalSignInput,
				},
			});

			if (addedVitalSigns) {
				setVitalSigns((prev) => [addedVitalSigns.data.addVitalSign, ...prev]);
				setVitalSign(initialVitalSign);
			}
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
				<PatientSearch
					setPatient={setPatient}
					setVitalSign={setVitalSign}
					error={error}
				/>
			</Row>

			{patient && (
				<>
					<Dropdown.Divider className="my-4" />

					<Row>
						<Col xs={12} lg={4} className="mb-3">
							<VitalSignForm
								patient={patient}
								setVitalSign={setVitalSign}
								vitalSign={vitalSign}
								onSubmit={onSubmit}
							/>
						</Col>

						<Col xs={12} lg={8}>
							<PatientVisitRecords
								patient={patient}
								vitalSigns={vitalSigns}
								setVitalSigns={setVitalSigns}
							/>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
}
export default VitalSignsSection;
