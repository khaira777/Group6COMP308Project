import Card from 'react-bootstrap/Card';
import useDate from '../hooks/useDate';

function DailyTipCard({ dailyTip: { content, user, createdAt } }) {
	const getDate = useDate({ dateStyle: 'medium' });

	return (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<Card.Title className="m-0">{user.name}</Card.Title>
				<small>{getDate(createdAt)}</small>
			</Card.Header>
			<Card.Body>
				<Card.Text>{content}</Card.Text>
			</Card.Body>
		</Card>
	);
}
export default DailyTipCard;
