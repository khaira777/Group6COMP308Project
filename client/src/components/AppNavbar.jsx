import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { USER_QUERY } from '../graphql/user';

function AppNavbar() {
	const { data } = useQuery(USER_QUERY.IS_LOGGED_IN);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (data?.isLoggedIn) setIsLoggedIn(true);
	}, [data?.isLoggedIn]);

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Home
				</Navbar.Brand>

				{!isLoggedIn && (
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/login">
							Login
						</Nav.Link>
						<Nav.Link as={Link} to="/Register">
							Register
						</Nav.Link>
					</Nav>
				)}

				{isLoggedIn && (
					<Nav className="ms-auto">
						<Nav.Link
							// TODO: Replace href to a game website
							href="https://www.google.com"
							target="_blank"
							rel="noreferrer">
							Fitness Games
						</Nav.Link>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
}
export default AppNavbar;
