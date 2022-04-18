import Container from 'react-bootstrap/Container';
import VitalSignsSection from '../components/VitalSignsSection';
import useAuth from '../hooks/useAuth';
import { USER_TYPE } from '../constants';
import DailyInfoSection from '../components/DailyInfoSection';

function Home() {
	const { user } = useAuth();

	return (
		<Container>
			{user?.type === USER_TYPE.NURSE && <VitalSignsSection />}
			{user?.type === USER_TYPE.PATIENT && <DailyInfoSection />}
		</Container>
	);
}
export default Home;
