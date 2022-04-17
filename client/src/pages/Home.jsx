import Container from 'react-bootstrap/Container';
import VitalSignsForm from '../components/VitalSignsForm';
import useAuth from '../hooks/useAuth';
import { USER_TYPE } from '../constants';

function Home() {
	const { user } = useAuth();

	return (
		<Container>
			{user?.type === USER_TYPE.NURSE && <VitalSignsForm />}
		</Container>
	);
}
export default Home;
