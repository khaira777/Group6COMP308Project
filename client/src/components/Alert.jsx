import { useMutation } from "@apollo/client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import { ALERT_MUTATION } from "../graphql/alert";
import useDate from "../hooks/useDate";

function Alert() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const { getDateStringFromMilliseconds } = useDate();
  const [sendAlertMutation] = useMutation(ALERT_MUTATION.SEND_ALERT, {
    onCompleted: (data) => {
      if (data) {
        setShowToast(true);
        setAlert(data.sendAlert);
      }
      clearLoading();
      closeModal();
    },
    onError: (_) => {
      setShowToast(true);
      setAlert("Something went wrong. Please try again.");
      clearLoading();
      closeModal();
    },
  });

  const clearLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onAlertButtonClick = () => {
    setShowModal(true);
  };

  const sendAlert = () => {
    if (message.length > 0) {
      setLoading(true);
      sendAlertMutation({ variables: { message } });
    } else {
      setFormError("Please enter a message");
    }
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const closeModal = () => {
    setMessage("");
    setFormError("");
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant="danger"
        className="d-flex gap-2 align-items-center justify-content-center"
        onClick={onAlertButtonClick}
        disabled={loading}
      >
        ALERT
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Alert Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Message</h4>
          <Form.Control
            as="textarea"
            rows={5}
            value={message}
            onChange={onMessageChange}
            style={{ resize: "none" }}
          />

          {formError && (
            <Form.Text className="text-danger">{formError}</Form.Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={sendAlert}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      {alert && (
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          style={{
            position: "fixed",
            right: "12px",
            top: "12px",
            border: "none",
            minWidth: "400px",
            zIndex: "9999",
            backgroundColor: "#fff",
            opacity: "1",
          }}
        >
          <Toast.Header>
            <strong className="me-auto text-danger">
              Emergency Alert Sent
            </strong>
            <small className="text-muted">
              {getDateStringFromMilliseconds(alert.createdAt)}
            </small>
          </Toast.Header>
          <Toast.Body>
            <p>Your message: {alert.message}</p>
            <p className="text-muted" style={{ width: "max-content" }}>
              First responders will take action as soon as possible!
            </p>
          </Toast.Body>
        </Toast>
      )}
    </>
  );
}
export default Alert;
