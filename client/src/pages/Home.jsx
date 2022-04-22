import Container from "react-bootstrap/Container";
import VitalSignsSection from "../components/VitalSignsSection";
import useAuth from "../hooks/useAuth";
import { USER_TYPE } from "../constants";
import DailyInfoSection from "../components/DailyInfoSection";
import { MdHealthAndSafety } from "react-icons/md";

function Home() {
  const { user } = useAuth();

  return (
    <Container>
      {user?.type === USER_TYPE.NURSE && <VitalSignsSection />}
      {user?.type === USER_TYPE.PATIENT && <DailyInfoSection />}

      {!user && (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 gap-2">
          <MdHealthAndSafety size="200px" fill="#47D1F2" />
          <h3 className="text-info">Welcome</h3>
        </div>
      )}
    </Container>
  );
}
export default Home;
