import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

function Temp() {
  //const { user } = useAuth();

  const location = useLocation();

  return (
    <Container>
      <div>
        <h2
          style={{
            marginTop: "50px",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          <FaHeartbeat fill="#FE251B" size="50px" /> The Prediction of the heart
          disease using AI is: {location.state.name}
        </h2>
      </div>
    </Container>
  );
}
export default Temp;
