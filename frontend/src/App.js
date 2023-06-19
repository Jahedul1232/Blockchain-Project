import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Doctor from "./components/Pages/doctor/doctor";
import LoginPage from "./components/Pages/login/login";
import Navbar from "./components/Pages/HomePage/Navbar/Navbar";
import HomePage from "./components/Pages/HomePage/Homepage";
// import { useNavigate } from "react-router-dom";
import Patient from "./components/Pages/patient/patient";
import Firebase_db from "./components/firebase/firebase";
import PatientLogin from "./components/Login/patientLogin/patientLog";
import PatientRegistration from "./components/Registration/Patient/patientReg";
import LoginLandingPage from "./components/Pages/login/loginLanding";
import DoctorLoginPage from "./components/Pages/doctor/doctorLogin";
import DoctorsLandingPage from "./components/Pages/doctor/doctorsLandingPage";
import HospitalLogin from "./components/Login/HIS/hospitallogin";
// import HospitalLoginLanginPage from "./components/Login/HIS/loginLandingPage";
import HospitalLoginLanding from "./components/Pages/his/hisLoginLanding";
import PatientfromHIS from "./components/Pages/patient/patientReadFromHIS";
import HISRegistration from "./components/Registration/HIS/hisRegistration";
import TestPage from "./components/Registration/HIS/testPage";

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
          <Routes>
            <Route path="/patientLogin" element={<PatientLogin />}></Route>
          </Routes>
          <Routes>
            <Route
              path="/patientRegistration"
              element={<PatientRegistration />}
            ></Route>
          </Routes>
          <Routes>
            <Route path="/loginLanding" element={<LoginLandingPage />}></Route>
          </Routes>
          <Routes>
            <Route
              path="/doctorLoginPage"
              element={<DoctorLoginPage />}
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/doctorsLandingPage"
              doctorsLandingPage
              element={<DoctorsLandingPage />}
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/hospitalLoginPage"
              element={<HospitalLogin />}
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/hospitalLoginLanding"
              element={<HospitalLoginLanding />}
            ></Route>
          </Routes>
          <Routes>
            <Route path="/patientfromHIS" element={<PatientfromHIS />}></Route>
          </Routes>
          <Routes>
            <Route path="/hisreg" element={<HISRegistration />}></Route>
          </Routes>
          <Routes>
            <Route path="/testpage" element={<TestPage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
