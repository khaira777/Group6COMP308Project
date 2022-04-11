import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AppNavbar() {
	const { isAuth, logout } = useAuth();

	const onLogout = () => {
		logout();
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Home
				</Navbar.Brand>

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
