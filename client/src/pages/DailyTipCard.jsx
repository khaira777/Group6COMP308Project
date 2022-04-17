import Card from 'react-bootstrap/Card';
import useDate from '../hooks/useDate';

function DailyTipCard({ dailyTip: { content, user, createdAt } }) {
	const { getDateStringFromMilliseconds } = useDate(true);

	return (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<Card.Title className="m-0">From: Nurse {user.name}</Card.Title>
				<small>{getDateStringFromMilliseconds(createdAt)}</small>
			</Card.Header>
			<Card.Body>
				<Card.Text>{content}</Card.Text>
			</Card.Body>
		</Card>
	);
}
export default DailyTipCard;
