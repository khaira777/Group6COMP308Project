import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AppNavbar from './components/AppNavbar';

function App() {
	return (
		<Router>
			<AppNavbar />
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
