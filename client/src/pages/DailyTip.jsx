import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DAILY_TIP_MUTATION, DAILY_TIP_QUERY } from '../graphql/daily-tip';

function DailyTip() {
	const [showModal, setShowModal] = useState(false);
	const [content, setContent] = useState('');
	const [error, setError] = useState('');
	const { data } = useQuery(DAILY_TIP_QUERY.GET_ALL_DAILY_TIPS);
	const [addDailyTipMutation] = useMutation(DAILY_TIP_MUTATION.ADD_DAILY_TIP, {
		onCompleted: (data) => {
			console.log(data);
			closeModal();
		},
		onError: (error) => {},
	});

	useEffect(() => {
		console.log(data?.dailyTips);
	}, [data?.dailyTips]);

	const openModal = () => setShowModal(true);

	const closeModal = () => {
		setContent('');
		setError('');
		setShowModal(false);
	};

	const onChange = (e) => {
		setContent(e.target.value);
	};

	const onSave = () => {
		if (content.length > 0) {
			addDailyTipMutation({ variables: { content } });
			closeModal();
		} else {
			setError('Please enter a daily tip');
		}
	};

	return (
		<>
			<CloseButton style={{ transform: 'rotate(45deg)' }} onClick={openModal} />

			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Daily Tip</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Control
						as="textarea"
						rows={5}
						style={{ resize: 'none' }}
						value={content}
						onChange={onChange}></Form.Control>

					{error && <Form.Text className="text-danger">{error}</Form.Text>}
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" onClick={onSave}>
						Save
					</Button>
					<Button variant="outline-secondary" onClick={closeModal}>
						Discard
					</Button>
				</Modal.Footer>
			</Modal>

			{data?.dailyTips?.map((dailyTip) => (
				<p key={dailyTip._id}>
					{dailyTip.content}
					<small>{dailyTip.user.name}</small>
				</p>
			))}
		</>
	);
}
export default DailyTip;
