import React, { Component, useState } from "react";
import { ethers } from "ethers";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firabase_config";
import { useNavigate } from "react-router-dom";
import "./patientReg.css";
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
  let [account, setAccount] = useState("");
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [height, setHeight] = useState();
  const [address, setAddress] = useState();
  const [regEmail, setRegEmail] = useState();
  const [regPass, setRegPass] = useState();
  const navigate = useNavigate();
  const connectionRef = collection(db, "records"); //Firebase connection
  const { ethereum } = window;

  var data = [
    {
      name: name,
      age: age,
      gender: gender,
      height: height,
      address: address,
    },
  ];

  const firebaseStore = async (secretKey, ciphertext, params) => {
    console.log("inside firebase");
    console.log(`secretKey is ${secretKey} data is ${ciphertext}`);
    await setDoc(doc(db, "records", params), {
      data: ciphertext,
      key: secretKey,
      timeStamp: serverTimestamp(),
    });
    console.log("stored data");
    alert("Data stored in firebase");
    setName("");
    setAddress("");
    setAge("");
    setGender("");
    setHeight("");
    setRegEmail("");
    setRegPass("");
  };

  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  const SearchableEncryption = (params) => {
    var crypto = require("crypto-js");
    const secretKey = "my-secret-key@123";
    var ciphertext = crypto.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    firebaseStore(secretKey, ciphertext, params);

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    // console.log("decrypted Data -");
    // console.log(decryptedData);

    return secretKey;
  };

  let contract;
  const connectContract = async () => {
    const Address = "0xa0820492024125F0f0F74e874eadd96a4909D353";
    //"0xD698932D2992aFA8085aE923ef2738c37b7bA587";
    const ABI = [
      {
        inputs: [],
        name: "retrieve",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_value",
            type: "string",
          },
        ],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);
    // console.log(contract.address);
  };

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
      const keyValue = SearchableEncryption(id);
      connectMetamask();
      connectContract();
      // console.log("data is : ", SearchableEncryption(id));
      const tx = await contract.store(keyValue);
      alert("Successfully Registered");
      navigate("/loginLanding", { state: { userID: id } });

      // const phrase = await contract.retrieve();
      // console.log("retrieve value is ", phrase);
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <div className="container">
      <h2>Welcome to Patient Registration Page</h2>
      <div className="mt-5">
        <section class="">
          <div class="">
            <div class="row justify-contain-center">
              <div class="col-12 col-sm-8 col-md-8 col-lg-5 col-xl-5">
                <img
                  className="imgLog1"
                  // src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class=""
                  alt="Sample image"
                />
              </div>
              <div class=" card col-12 col-sm-8 col-md-8 col-lg-5 col-xl-7 shadow-lg p-2">
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
                        placeholder="Name"
                      />
                    </div>

                    {/* <!-- Patient Age --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        // onClick={navigateToPatient}
                        placeholder="Age"
                      />
                    </div>

                    {/* <!-- Patient Gender --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        // onClick={navigateToPatient}
                        placeholder="Gender"
                      />
                    </div>

                    {/* <!-- Patient Height --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setHeight(e.target.value)}
                        value={height}
                        // onClick={navigateToPatient}
                        placeholder="Height"
                      />
                    </div>

                    {/* <!-- Patient Address --> */}
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        // onClick={navigateToPatient}
                        placeholder="Address"
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
                        placeholder="xyz@gmail.com"
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
};;;;;;
export default PatientRegistration;
