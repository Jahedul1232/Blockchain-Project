import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Doctor from "./components/Pages/doctor/doctor";
import LoginPage from "./components/Pages/login/login";
// import { useNavigate } from "react-router-dom";
import Patient from "./components/Pages/patient/patient";

function App() {
  return (
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
      </div>
    </Router>
  );
}

export default App;
