import React, { Component, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firabase_config";
import { useNavigate } from "react-router-dom";
import LoginLandingPage from "../../Pages/login/loginLanding";
import "./patientLog.css";

const PatientLogin = () => {
  const [logEmail, setLogEmail] = useState();
  const [logPass, setLogPass] = useState();
  const navigate = useNavigate();
  // const [pass, setPass] = useState();

  const HandleLoging = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, logEmail, logPass)
      .then((userCredential) => {
        const user = userCredential.user;
        const userID = user.uid;
        // const id = 5;
        // console.log(user);
        alert("Successfully logged in");
        navigate("/loginLanding", { state: { userID: userID } });
      })
      .catch((error) => {
        console.log("error is ", error.message);
        setLogEmail("");
        setLogPass("");
        alert(`${error}`);
      });
  };

  // const Login = async () => {
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, logEmail, logPass);
  //     console.log("logged in");
  //   } catch (error) {
  //     console.log("error is ", error.message);
  //   }
  // };

  function buttonCall() {
    const navigateToPatient = () => {
      navigate("/patientRegistration");
    };
    navigateToPatient();
  }

  return (
    <div class="mt-3">
      <h2>Welcome to Patient Login Page</h2>
      <div className="mt-5">
        <section class="">
          <div class="">
            <div class="row justify-content-center">
              {/* h-full */}
              <div class="col-4">
                <img
                  class="imgLog"
                  // src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  // src="https://esrdlab.cse.buet.ac.bd/assets/img/logo.png"
                  // class="w-full"
                  alt="Sample image"
                />
              </div>
              <div class="col-5 mt-5 p-5">
                <form>
                  {/* <div class="flex flex-row items-center justify-center lg:justify-start"> */}

                  {/* <!-- Email input --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setLogEmail(e.target.value)}
                      value={logEmail}
                      // onClick={navigateToPatient}
                      placeholder="Email address"
                    />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="mb-6">
                    <input
                      type="password"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setLogPass(e.target.value)}
                      value={logPass}
                      placeholder="Password"
                    />
                  </div>

                  <div class="flex justify-between items-center mb-6">
                    <div class="form-group form-check">
                      {/* <input
                        type="checkbox"
                        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        id="exampleCheck2"
                      /> */}
                      {/* <label
                        class="form-check-label inline-block text-gray-800"
                        for="exampleCheck2"
                      >
                        Remember me
                      </label> */}
                    </div>
                    <a href="#!" class="text-gray-800">
                      Forgot password?
                    </a>
                  </div>

                  <div class="text-center lg:text-left">
                    <button
                      type="button"
                      class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={HandleLoging}
                    >
                      Login
                    </button>
                    <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                      Don't have an account?
                      <a
                        href="#!"
                        class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                        onClick={buttonCall}
                      >
                        Register
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};;;;;;;;;;;;;;;;;;;;;;;
export default PatientLogin;
