import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'

function App() {
  return (
    <>
      <NavBar />
        <Router>
            <Routes>
                {/* <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} */}
                
                <Route path="/" element={Auth(LandingPage, null)} />
                <Route path="/login" element={Auth(LoginPage, true)} />
                <Route path="/register" element={Auth(RegisterPage, false)} />
            </Routes>
        </Router>
        <Footer />
    </>
  );
}

export default App;