import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { USER_TYPE } from '../constants';
import useAuth from '../hooks/useAuth';
import useTransformCase from '../hooks/useTransformCase';
import Alert from './Alert';
import { MdHealthAndSafety } from 'react-icons/md';

function AppNavbar() {
	const { isAuth, user, logout } = useAuth();
	const transform = useTransformCase();
	const navigate = useNavigate();

	const onLogout = () => {
		logout();
		navigate('/');
	};

	return (
		// TODO: Convert to OffCanvas for responsiveness when have time
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand
					className="me-5 d-flex align-items-center gap-2"
					as={Link}
					to="/">
					{user ? (
						`${user?.name} - ${transform(user?.type)}`
					) : (
						<MdHealthAndSafety fill="#47D1F2" size="50px" />
					)}
				</Navbar.Brand>
				{isAuth && user?.type === USER_TYPE.PATIENT && <Alert />}

				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/">
						Home
					</Nav.Link>

					{!isAuth && (
						<>
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/Register">
								Register
							</Nav.Link>
						</>
					)}

					{isAuth && (
						<>
							<Nav.Link as={Link} to="/daily-tip">
								Daily Tips
							</Nav.Link>
							<Nav.Link
								href="https://justdancenow.com/"
								target="_blank"
								rel="noreferrer">
								Fitness Games
							</Nav.Link>
							<Nav.Link onClick={onLogout}>Logout</Nav.Link>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
export default AppNavbar;
