import Body from "../HomePage/Body/Body";
import { useNavigate } from "react-router-dom";

// import image from "../../../assets/history1";
import './login.css'
import patient_image from "../../../assets/examination.png"
import doctor_image from "../../../assets/doctor.png"
import tele_image from "../../../assets/doctor (1).png"
import his_image from "../../../assets/hospital (1).png"
import Patient from "../patient/patient";
import Firebase from "../../firebase/firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const navigateToPatient = () => {
    // navigate("/patient");
    navigate("/patientLogin");
  };
  const navigateToDoctor = () => {
    navigate("doctorLoginPage");
  };
  const navigateToFirebase = () => {
    navigate("/hospitalLoginPage");
  };

  return (
    <div className="login">
      <div>
        <Body />
      </div>
      <div className="loginButton" id="text">
        <h2>Welcome to Login</h2>
        <div className="container py-3 my-3 py-3 my-3">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
              <div className="first_box button_box" onClick={navigateToPatient}>
                <img src={patient_image} alt="" className="button_images"></img>
                <button className="login_button"> Patient Login</button>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 ">
              <div className="second_box button_box" onClick={navigateToDoctor}>
                <img src={doctor_image} alt="" className="button_images"></img>
                <button className="login_button">Doctor Login</button>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 ">
              <div
                className="third_box button_box"
                onClick={navigateToFirebase}
              >
                <img src={his_image} alt="" className="button_images"></img>
                <button className="login_button">HIS Login</button>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 ">
              <div className="fourth_box button_box" onClick={""}>
                <img src={tele_image} alt="" className="button_images"></img>
                <button className="login_button">TeleHealth Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <footer class="bg-light text-center text-lg-start">
        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          © 2020 Copyright:
          <a class="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
          <!-- Copyright -->
      </footer> */}
    </div>
  );
};

export default LoginPage;
