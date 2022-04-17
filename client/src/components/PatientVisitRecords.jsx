import Table from 'react-bootstrap/Table';
import useDate from '../hooks/useDate';

function PatientVisitRecords({ patient, vitalSigns }) {
	const { getDateStringFromMilliseconds } = useDate();

	return (
		<Table responsive bordered size hover>
			<thead>
				<tr>
					<th>Date</th>
					<th>Body Temperature (Celsius)</th>
					<th>Blood Pressure (mmHg)</th>
					<th>Heart Rate (BPM)</th>
				</tr>
			</thead>

			<tbody>
				{vitalSigns.map((vitalSign) => (
					<tr key={vitalSign._id}>
						<td style={{ whiteSpace: 'nowrap' }}>
							{getDateStringFromMilliseconds(vitalSign.visitDate)}
						</td>
						<td>{Math.round(vitalSign.bodyTemperature * 100) / 100}</td>
						<td>{vitalSign.bloodPressure}</td>
						<td>{vitalSign.heartRate}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
export default PatientVisitRecords;
