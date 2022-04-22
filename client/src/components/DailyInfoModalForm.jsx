import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DAILY_INFO_MUTATION } from "../graphql/daily-info";
import useAuth from "../hooks/useAuth";
import useDate from "../hooks/useDate";

const initialDailyInfo = {
  date: "",
  weight: "",
  pulseRate: "",
  bloodPressure: "",
  bodyTemperature: "",
  respiratoryRate: "",
};

function DailyInfoModalForm({
  setDailyInfoRecords,
  closeModal,
  showModal,
  editDailyInfoRecord,
}) {
  const [dailyInfo, setDailyInfo] = useState(initialDailyInfo);
  const [error, setError] = useState("");
  const { getDateStringFromMilliseconds, getToday } = useDate(true);
  const { user } = useAuth();

  const [addDailyInfo] = useMutation(DAILY_INFO_MUTATION.ADD_DAILY_INFO, {
    onCompleted: (data) => {
      if (data?.addDailyInfo) {
        closeModal();
        setDailyInfo(initialDailyInfo);
        setDailyInfoRecords((prev) => [
          {
            ...data.addDailyInfo,
            date: getDateStringFromMilliseconds(data.addDailyInfo.date),
          },
          ...prev,
        ]);
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const [updateDailyInfo] = useMutation(DAILY_INFO_MUTATION.UPDATE_DAILY_INFO, {
    onCompleted: (data) => {
      if (data?.updateDailyInfo) {
        closeModal();
        setDailyInfo(initialDailyInfo);
        setDailyInfoRecords((prev) =>
          prev.map((di) => {
            if (di._id === data.updateDailyInfo._id) {
              return {
                ...data.updateDailyInfo,
                date: getDateStringFromMilliseconds(data.updateDailyInfo.date),
              };
            }
            return di;
          })
        );
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onChange = (e) => {
    setDailyInfo({
      ...dailyInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (dailyInfo.date === "") {
      dailyInfo.date = new Date().toLocaleDateString();
    }
  }, [dailyInfo, getToday]);

  useEffect(() => {
    if (editDailyInfoRecord) {
      setDailyInfo(editDailyInfoRecord);
    }
  }, [editDailyInfoRecord]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const dailyInfoInput = {
        date: dailyInfo.date,
        weight: parseFloat(dailyInfo.weight),
        pulseRate: parseInt(dailyInfo.pulseRate),
        bloodPressure: parseInt(dailyInfo.bloodPressure),
        bodyTemperature: parseFloat(dailyInfo.bodyTemperature),
        respiratoryRate: parseInt(dailyInfo.respiratoryRate),
      };

      if (editDailyInfoRecord) {
        await updateDailyInfo({
          variables: {
            _id: editDailyInfoRecord._id,
            dailyInfoInput,
          },
        });
      } else {
        await addDailyInfo({
          variables: {
            dailyInfoInput,
          },
        });
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Daily Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="patient" className="mb-2">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Patient Name"
              value={user?.name}
              readOnly
              disabled
              required
            />
          </Form.Group>

          <Form.Group controlId="pulseRate" className="mb-2">
            <Form.Label>
              Pulse Rate/Heart Rate <Form.Text>(BPM)</Form.Text>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Pulse Rate"
              value={dailyInfo.pulseRate}
              name="pulseRate"
              onChange={onChange}
              min="0"
              max="200"
              required
            />
          </Form.Group>

          <Form.Group controlId="bloodPressure" className="mb-2">
            <Form.Label>
              Blood Pressure <Form.Text>(mmHg)</Form.Text>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Blood Pressure"
              value={dailyInfo.bloodPressure}
              name="bloodPressure"
              onChange={onChange}
              min="0"
              max="200"
              required
            />
          </Form.Group>

          <Form.Group controlId="bodyTemperature" className="mb-2">
            <Form.Label>
              Body Temperature <Form.Text>(Celsius)</Form.Text>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Body Temperature"
              value={dailyInfo.bodyTemperature}
              name="bodyTemperature"
              onChange={onChange}
              min="0"
              max="100"
              step=".01"
              required
            />
          </Form.Group>

          <Form.Group controlId="respiratoryRate" className="mb-2">
            <Form.Label>
              Respiratory Rate{" "}
              <Form.Text>(Number of breaths per minute)</Form.Text>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Respiratory Rate"
              value={dailyInfo.respiratoryRate}
              name="respiratoryRate"
              onChange={onChange}
              min="0"
              max="200"
              required
            />
          </Form.Group>

          <Form.Group controlId="weight" className="mb-2">
            <Form.Label>
              Body Weight <Form.Text>(kg)</Form.Text>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Body Weight"
              value={dailyInfo.weight}
              name="weight"
              onChange={onChange}
              min="0"
              max="300"
              step=".01"
              required
            />
          </Form.Group>

          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default DailyInfoModalForm;
