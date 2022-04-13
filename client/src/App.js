import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import PrivateRoute from './components/PrivateRoute';
import useAuth from './hooks/useAuth';
import DailyTip from './pages/DailyTip';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

function App() {
	const { isAuth } = useAuth();

	return (
		<Router>
			<AppNavbar />

			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
						<Route path="/daily-tip" element={<DailyTip />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
