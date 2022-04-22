import Container from "react-bootstrap/Container";
//import { NavigationContainer } from '@react-navigation/native';
// import { Stack } from 'react-bootstrap/Stack';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import PrivateRoute from "./components/PrivateRoute";
import useAuth from "./hooks/useAuth";
import DailyTips from "./pages/DailyTips";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Prediction from "./pages/Prediction";
import Register from "./pages/Register";
import Temp from "./pages/Temp";

function App() {
  const { isAuth } = useAuth();

  return (
    <Router>
      <AppNavbar />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/daily-tip" element={<DailyTips />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
