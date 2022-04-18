import Container from 'react-bootstrap/Container';
import VitalSignsSection from '../components/VitalSignsSection';
import useAuth from '../hooks/useAuth';
import { USER_TYPE } from '../constants';

function Home() {
	const { user } = useAuth();

	return (
		<Container>
			{user?.type === USER_TYPE.NURSE && <VitalSignsSection />}
		</Container>
	);
}
export default Home;
