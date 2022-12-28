import React, { Component, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firabase_config";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firabase_config";
// import "./patientLog.css";

const PatientRegistration = () => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [height, setHeight] = useState();
  const [address, setAddress] = useState();
  const [regEmail, setRegEmail] = useState();
  const [regPass, setRegPass] = useState();

  // const [pass, setPass] = useState();
  // const navigate = useNavigate();

  const handleReg = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, regEmail, regPass);

      console.log(res);
      // if (res) console.log("data not saved");
      // else console.log("data saved");
      await setDoc(doc(db, "records", res.user.uid), {
        name: name,
        age: age,
        gender: gender,
        height: height,
        address: address,
        timeStamp: serverTimestamp(),
      });

      alert("Successfully Registered");
    } catch (error) {
      alert(`${error}`);
      // console.log("error is ", error.message);
    }
  };

  const Register = async () => {};

  function buttonCall() {
    // const navigateToPatient = () => {
    //   navigate("/patient");
    //   // navigate("/patientLogin");
    // };
  }

  return (
    <div>
      <h2>Welcome to Registration Page</h2>
      <div className="canvas">
        <section class="h-screen">
          <div class="px-6 h-full text-gray-800">
            <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img
                  // src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class="w-full"
                  alt="Sample image"
                />
              </div>
              <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form>
                  {/* <div class="flex flex-row items-center justify-center lg:justify-start"> */}
                  {/* <!-- Patient Name --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setName(e.target.value)}
                      // onClick={navigateToPatient}
                      placeholder="Name"
                    />
                  </div>

                  {/* <!-- Patient Age --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setAge(e.target.value)}
                      // onClick={navigateToPatient}
                      placeholder="Age"
                    />
                  </div>

                  {/* <!-- Patient Gender --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setGender(e.target.value)}
                      // onClick={navigateToPatient}
                      placeholder="Gender"
                    />
                  </div>

                  {/* <!-- Patient Height --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setHeight(e.target.value)}
                      // onClick={navigateToPatient}
                      placeholder="Height"
                    />
                  </div>

                  {/* <!-- Patient Address --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setAddress(e.target.value)}
                      // onClick={navigateToPatient}
                      placeholder="Address"
                    />
                  </div>

                  {/* <!-- Email input --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      onChange={(e) => setRegEmail(e.target.value)}
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
                      onChange={(e) => setRegPass(e.target.value)}
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
                    {/* <a href="#!" class="text-gray-800">
                      Forgot password?
                    </a> */}
                  </div>

                  <div class="text-center lg:text-left">
                    <button
                      type="button"
                      class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={handleReg}
                    >
                      Registration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default PatientRegistration;
