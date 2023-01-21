import React, { Component, useState } from "react";
import { ethers } from "ethers";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firabase_config";
import { useNavigate } from "react-router-dom";
// import "./patientReg.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firabase_config";
// import { db } from "../../../firabase_config";
// import "./patientLog.css";

const HISRegistration = () => {
  let [account, setAccount] = useState("");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [regEmail, setRegEmail] = useState();
  const [regPass, setRegPass] = useState();
  const navigate = useNavigate();
  const connectionRef = collection(db, "records"); //Firebase connection
  const { ethereum } = window;

  const firebaseStore = async (params) => {
    console.log("inside firebase");
    await setDoc(doc(db, "HISrecords", params), {
      name: name,
      address: address,
      timeStamp: serverTimestamp(),
    });
    console.log("stored data");
    alert("Data stored in firebase");
    setName("");
    setAddress("");
    setRegEmail("");
    setRegPass("");
  };

  let contract;

  const handleReg = async (e) => {
    e.preventDefault();
    //Authentication........
    try {
      const res = await createUserWithEmailAndPassword(auth, regEmail, regPass);
      const id = res.user.uid;
      // console.log(res);
      // if (res) console.log("data not saved");
      // else console.log("data saved");
      // await setDoc(doc(db, "records", res.user.uid), {
      //   name: name,
      //   age: age,
      //   gender: gender,
      //   height: height,
      //   address: address,
      //   timeStamp: serverTimestamp(),
      // });

      //Encrypting values and storing values in firebase......
      // console.log("data is : ", SearchableEncryption(id));
      // const tx = await contract.store(keyValue);

      alert("Successfully Registered");
      firebaseStore(id);
      // navigate("/loginLanding", { state: { userID: id } });
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <div className="container">
      <h2>Welcome to Hospital Registration Page</h2>
      <div className="mt-5">
        <section class="">
          <div class="">
            <div class="row justify-contain-center">
              <div class="col-11 col-sm-8 col-md-8 col-lg-5 col-xl-5">
                <img
                  class="imgLog1"
                  // src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  alt="Sample image"
                />
              </div>
              <div class="card col-11 col-sm-8 col-md-8 col-lg-6 col-xl-7 shadow-lg p-2">
                <div class="card-body">
                  <div class="mt-3">
                    <h3>Registration</h3>
                  </div>
                  <form className="mt-5">
                    {/* <div class="flex flex-row items-center justify-center lg:justify-start"> */}
                    {/* <!-- Patient Name --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        // onClick={navigateToPatient}
                        placeholder="Hospital Name"
                      />
                    </div>

                    {/* <!-- Hospital Address --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        // onClick={navigateToPatient}
                        placeholder="Hospital Address"
                      />
                    </div>

                    {/* <!-- Email input --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setRegEmail(e.target.value)}
                        value={regEmail}
                        // onClick={navigateToPatient}
                        placeholder="hospitalxyz@gmail.com"
                      />
                    </div>

                    {/* <!-- Password input --> */}
                    <div class="mb-4">
                      <input
                        type="password"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setRegPass(e.target.value)}
                        value={regPass}
                        placeholder="******"
                      />
                    </div>

                    <div class="text-center lg:text-left mb-3">
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
          </div>
        </section>
      </div>
    </div>
  );
};
export default HISRegistration;
