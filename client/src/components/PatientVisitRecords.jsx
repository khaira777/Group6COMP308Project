import { useMutation } from "@apollo/client";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { VITAL_SIGN_MUTATION } from "../graphql/vital-sign";
import useDate from "../hooks/useDate";
import ConfirmationModal from "./ConfirmationModal";
import VitalSignForm from "./VitalSignForm";

function PatientVisitRecords({ vitalSigns, setVitalSigns }) {
  const {
    getDateStringFromMilliseconds,
    getISODateStringFromMilliseconds,
    checkIsDateAfterToday,
  } = useDate();

  const [deleteRecord] = useMutation(VITAL_SIGN_MUTATION.REMOVE_VITAL_SIGN, {
    onCompleted: (data) => {
      if (data) {
        setVitalSigns((prev) =>
          prev.filter((vitalSign) => vitalSign._id !== data.removeVitalSign)
        );
      }
    },
  });
  const [editRecord] = useMutation(VITAL_SIGN_MUTATION.EDIT_VITAL_SIGN);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editVitalSign, setEditVitalSign] = useState(null);
  const [deleteVitalSign, setDeleteVitalSign] = useState(null);

  const [error, setError] = useState("");

  const openEditVitalSignModal = (vitalSign) => {
    setEditVitalSign({
      ...vitalSign,
      visitDate: getISODateStringFromMilliseconds(vitalSign.visitDate),
    });

    setShowEditModal(true);
  };

  const openDeleteVitalSignModal = (vitalSign) => {
    setDeleteVitalSign(vitalSign);
    setShowDeleteModal(true);
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const isDateAfterToday = checkIsDateAfterToday(editVitalSign.visitDate);
      if (isDateAfterToday) {
        throw new Error("Visit date cannot be in the future");
      }

      const vitalSignInput = {
        bodyTemperature: parseFloat(editVitalSign.bodyTemperature),
        bloodPressure: parseInt(editVitalSign.bloodPressure),
        heartRate: parseInt(editVitalSign.heartRate),
        visitDate: editVitalSign.visitDate,
        patientId: editVitalSign.patient._id,
        nurseId: editVitalSign.nurse._id,
      };

      await editRecord({
        variables: {
          vitalSignInput,
          _id: editVitalSign._id,
        },
      });

      setShowEditModal(false);
      setError("");
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <>
      <Table responsive bordered size hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Body Temperature (Celsius)</th>
            <th>Blood Pressure (mmHg)</th>
            <th>Heart Rate (BPM)</th>
            <th>Nurse</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {vitalSigns.map((vitalSign) => (
            <tr key={vitalSign._id}>
              <td style={{ whiteSpace: "nowrap" }}>
                {getDateStringFromMilliseconds(vitalSign.visitDate)}
              </td>
              <td>{Math.round(vitalSign.bodyTemperature * 100) / 100}</td>
              <td>{vitalSign.bloodPressure}</td>
              <td>{vitalSign.heartRate}</td>
              <td style={{ whiteSpace: "nowrap" }}>{vitalSign.nurse.name}</td>
              <td className="d-flex gap-2">
                <Button
                  variant="warning"
                  onClick={() => openEditVitalSignModal(vitalSign)}
                >
                  <FaPencilAlt />
                </Button>

                <Button
                  variant="danger"
                  onClick={() => openDeleteVitalSignModal(vitalSign)}
                >
                  <FaRegTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vital Sign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VitalSignForm
            vitalSign={editVitalSign}
            patient={editVitalSign?.patient}
            onSubmit={onEditSubmit}
            setVitalSign={setEditVitalSign}
            isEdit={true}
            error={error}
          />
        </Modal.Body>
      </Modal>

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete Vital Sign?"
        message="Are you sure to delete this vital sign record?"
        onConfirm={async () => {
          await deleteRecord({
            variables: {
              _id: deleteVitalSign._id,
            },
          });
          setShowDeleteModal(false);
        }}
      />
    </>
  );
}
export default PatientVisitRecords;
