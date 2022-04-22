import { useQuery } from "@apollo/client";
import { useCallback, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import { USER_QUERY } from "../graphql/user";

const filterByFields = ["name", "email"];

function PatientSearch({ setPatient, setVitalSign }) {
  const [patients, setPatients] = useState([]);
  const ref = useRef();

  useQuery(USER_QUERY.GET_PATIENTS, {
    onCompleted: (data) => {
      if (data) {
        setPatients(
          data.getPatients?.map((patient) => ({ ...patient, id: patient._id }))
        );
      }
    },
  });

  const clearSearch = useCallback(() => {
    ref.current.clear();
    setPatient(null);
    setVitalSign((prev) => ({
      ...prev,
      bloodPressure: "",
      heartRate: "",
      bodyTemperature: "",
      visitDate: "",
    }));
  }, [setPatient, setVitalSign]);

  return (
    <div className="d-flex justify-content-between gap-2">
      <Typeahead
        className="flex-fill"
        id="patient-search"
        placeholder="Search for a patient..."
        options={patients}
        filterBy={filterByFields}
        labelKey={(option) => `${option.name} (${option.email})`}
        onChange={(selected) => {
          if (selected.length) {
            setPatient(selected[0]);
          }
        }}
        ref={ref}
        maxResults={10}
      />

      <Button variant="secondary" onClick={clearSearch}>
        Clear
      </Button>
    </div>
  );
}
export default PatientSearch;
