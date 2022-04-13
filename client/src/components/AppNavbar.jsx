import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { USER_TYPE } from '../constants';
import useAuth from '../hooks/useAuth';
import useTransformCase from '../hooks/useTransformCase';
import Alert from './Alert';

function AppNavbar() {
	const { isAuth, user, logout } = useAuth();
	const transform = useTransformCase();
	const navigate = useNavigate();

	const onLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand className="me-5" as={Link} to="/">
					{user ? `${user?.name} - ${transform(user?.type)}` : 'Home'}
				</Navbar.Brand>
				{isAuth && user?.type === USER_TYPE.PATIENT && <Alert />}

				{!isAuth && (
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/login">
							Login
						</Nav.Link>
						<Nav.Link as={Link} to="/Register">
							Register
						</Nav.Link>
					</Nav>
				)}

				{isAuth && (
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/daily-tip">
							Daily Tip
						</Nav.Link>
						<Nav.Link
							// TODO: Replace href to a game website
							href="https://www.google.com"
							target="_blank"
							rel="noreferrer">
							Fitness Games
						</Nav.Link>
						<Nav.Link onClick={onLogout}>Logout</Nav.Link>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
}
export default AppNavbar;
