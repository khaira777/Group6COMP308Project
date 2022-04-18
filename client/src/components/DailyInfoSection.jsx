import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { DAILY_INFO_QUERY } from '../graphql/daily-info';
import useDate from '../hooks/useDate';
import DailyInfoModalForm from './DailyInfoModalForm';
import { FaPencilAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

function DailyInfoSection() {
	const [dailyInfoRecords, setDailyInfoRecords] = useState([]);
	const [editDailyInfoRecord, setEditDailyInfoRecord] = useState(null);
	const { getDateStringFromMilliseconds } = useDate(true);
	const [isAddedDailyInfo, setIsAddedDailyInfo] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useQuery(DAILY_INFO_QUERY.GET_DAILY_INFO, {
		onCompleted: (data) => {
			setDailyInfoRecords(
				data.dailyInfo.map((di) => ({
					...di,
					date: getDateStringFromMilliseconds(di.date),
				}))
			);
		},
	});

	useEffect(() => {
		const checkIfDailyInfoExists = () => {
			const isDailyInfoExists = dailyInfoRecords.some(
				(di) =>
					di.date ===
					new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })
			);

			if (isDailyInfoExists) {
				setIsAddedDailyInfo(true);
			}
		};

		checkIfDailyInfoExists();
	}, [dailyInfoRecords, getDateStringFromMilliseconds]);

	const onEdit = (di) => {
		setEditDailyInfoRecord(di);
		setShowModal(true);
	};

	return (
		<>
			{isAddedDailyInfo ? (
				<h5 className="my-3 d-flex justify-content-end">
					<Badge bg="success">Already Added Daily Info For Today</Badge>
				</h5>
			) : (
				<div className="my-3 d-flex justify-content-end">
					<Button onClick={() => setShowModal(true)}>Add Daily Info</Button>
				</div>
			)}

			<Table responsive hover>
				<thead>
					<tr>
						<th>Date</th>
						<th>Weight (kg)</th>
						<th>Pulse Rate (BPM)</th>
						<th>Blood Pressure (mmHg)</th>
						<th>Body Temperature</th>
						<th>Respiratory Rate</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{dailyInfoRecords?.length > 0 &&
						dailyInfoRecords.map((di) => (
							<tr key={di._id}>
								<td>{di.date}</td>
								<td>{di.weight}</td>
								<td>{di.pulseRate}</td>
								<td>{di.bloodPressure}</td>
								<td>{di.bodyTemperature}</td>
								<td>{di.respiratoryRate}</td>
								<td>
									<Button variant="warning" onClick={() => onEdit(di)}>
										<FaPencilAlt />
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>

			<DailyInfoModalForm
				setDailyInfoRecords={setDailyInfoRecords}
				closeModal={() => setShowModal(false)}
				showModal={showModal}
				editDailyInfoRecord={editDailyInfoRecord}
			/>
		</>
	);
}
export default DailyInfoSection;
