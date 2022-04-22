import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { PREDICTION_MUTATION } from "../graphql/prediction";

function Prediction() {
  let navigate = useNavigate();

  var resultPrediction = 0;

  const [myData, setMyData] = useState({
    Age: 0,
    RestingBP: 0,
    Cholesterol: 0,
    FastingBS: 0,
    MaxHR: 0,
    Oldpeak: 0,
  });

  const onChange = (e) => {
    e.persist();
    setMyData({ ...myData, [e.target.name]: e.target.value });
  };

  const [showLoading, setShowLoading] = useState(false);

  const [addPredictionMutation] = useMutation(
    PREDICTION_MUTATION.ADD_PREDICTION,
    {
      onCompleted: (data) => {
        if (data) {
          resultPrediction = data["addPrediction"]["value"];
          navigate("/temp", { state: { id: 1, name: resultPrediction } });
        }
      },
      onError: (error) => {
        console.log("error");
      },
    }
  );

  const onSave = () => {
    setShowLoading(true);
    addPredictionMutation({
      variables: {
        Age: parseFloat(myData.Age),
        RestingBP: parseFloat(myData.RestingBP),
        Cholesterol: parseFloat(myData.Cholesterol),
        FastingBS: parseFloat(myData.FastingBS),
        MaxHR: parseFloat(myData.MaxHR),
        Oldpeak: parseFloat(myData.Oldpeak),
      },
    });
  };

  return (
    <Container className={"text-center"} style={{ marginTop: "20px" }}>
      <div className="entryform">
        <div>
          <h2 style={{ color: "teal" }}>
            <strong>Predict Heart Disease using AI</strong>
          </h2>

          <form style={{ marginTop: "25px" }}>
            <Form.Group>
              <Form.Label> Age:</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                placeholder="Age:"
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Resting BP:</Form.Label>
              <Form.Control
                type="number"
                name="RestingBP"
                placeholder="Resting BP:"
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Cholesterol:</Form.Label>
              <Form.Control
                type="number"
                name="Cholesterol"
                placeholder="Cholesterol:"
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Fasting BS:</Form.Label>
              <Form.Control
                type="number"
                name="FastingBS"
                placeholder="Fasting BS:"
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Max HR:</Form.Label>
              <Form.Control
                type="number"
                name="MaxHR"
                placeholder="Max HR:"
                required
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Oldpeak:</Form.Label>
              <Form.Control
                type="number"
                name="Oldpeak"
                placeholder="Oldpeak:"
                onChange={onChange}
                required
              />
            </Form.Group>

            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              type="button"
              onClick={onSave}
            >
              Predict
            </Button>
          </form>

          {showLoading === false ? (
            <span>Waiting for Execution</span>
          ) : (
            <div
              style={{
                textAlignVertical: "center",
                textAlign: "center",
              }}
            >
              <span>Please wait while results are calculated: </span>
              <Spinner animation="border" role="status">
                <span className="sr-only"></span>
              </Spinner>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
export default Prediction;
