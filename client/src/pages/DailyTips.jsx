import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import { DAILY_TIP_MUTATION, DAILY_TIP_QUERY } from "../graphql/daily-tip";
import DailyTipCard from "./DailyTipCard";
import useAuth from "../hooks/useAuth";
import { USER_TYPE } from "../constants";

function DailyTips() {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [dailyTips, setDailyTips] = useState([]);
  const { user } = useAuth();
  const [addDailyTipMutation] = useMutation(DAILY_TIP_MUTATION.ADD_DAILY_TIP, {
    onCompleted: (data) => {
      if (data) {
        setDailyTips((prev) => [data.addDailyTip, ...prev]);
      }
      closeModal();
    },
    onError: (error) => {},
  });
  const navigate = useNavigate();

  useQuery(DAILY_TIP_QUERY.GET_ALL_DAILY_TIPS, {
    onCompleted: (data) => {
      setDailyTips(data?.dailyTips);
    },
    onError: (_) => {
      navigate("/not-found");
    },
  });

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setContent("");
    setError("");
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
      setError("Please enter a daily tip");
    }
  };

  return (
    <Stack gap={3} className="m-3">
      <Stack
        direction="horizontal"
        className="align-items-center justify-content-between"
      >
        <h2 className="m-0">Daily Motivational Tips</h2>
        {user?.type === USER_TYPE.NURSE && (
          <Button className="m-0 align-self-end" onClick={openModal}>
            Add Daily Tip
          </Button>
        )}
      </Stack>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Tip</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={5}
            style={{ resize: "none" }}
            value={content}
            onChange={onChange}
          ></Form.Control>

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

      {dailyTips?.map((dailyTip) => (
        <DailyTipCard key={dailyTip._id} dailyTip={dailyTip} />
      ))}
    </Stack>
  );
}
export default DailyTips;
