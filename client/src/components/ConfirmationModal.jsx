import Modal from 'react-bootstrap/Modal';

function ConfirmationModal({ show, onHide, onConfirm, title, message }) {
	return (
		<Modal show={show} onHide={onHide} backdrop>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{message}</p>
			</Modal.Body>
			<Modal.Footer>
				<button className="btn btn-danger" onClick={onConfirm}>
					Delete
				</button>
				<button className="btn btn-secondary" onClick={onHide}>
					Cancel
				</button>
			</Modal.Footer>
		</Modal>
	);
}
export default ConfirmationModal;
