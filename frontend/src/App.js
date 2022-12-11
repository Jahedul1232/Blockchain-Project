import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Doctor from "./components/Pages/doctor/doctor";
import LoginPage from "./components/Pages/login/login";
import Navbar from "./components/Pages/HomePage/Navbar/Navbar";
import HomePage from "./components/Pages/HomePage/Homepage";
// import { useNavigate } from "react-router-dom";
import Patient from "./components/Pages/patient/patient";
import Firebase_db from "./components/firebase/firebase";   

function App() {
  return (
    <div>
      <HomePage />
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
          </Routes>
          <Routes>
            <Route path="/patient" element={<Patient />}></Route>
          </Routes>
          <Routes>
            <Route path="/doctor" element={<Doctor />}></Route>
          </Routes>
          <Routes>
            <Route path="/firebase" element={<Firebase_db />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
