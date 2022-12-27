import { ethers } from "ethers";
import { useState } from "react";
import "./doctor.css";
// import { db } from "../../firabase_config";
import { db } from "../../../firabase_config";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

function Patient() {
  let [account, setAccount] = useState("");
  let [contractData, setContractData] = useState();
  const [patient_id, setPatient_id] = useState("");
  const [patient_name, setPatient_name] = useState("");
  const [patient_age, setPatient_age] = useState("");
  const [patient_gender, setPatient_gender] = useState("");
  const [patient_height, setPatient_height] = useState("");
  const [patient_address, setPatient_address] = useState("");
  const connectionRef = collection(db, "user"); //Firebase connection
  var data = [
    {
      name: patient_name,
      age: patient_age,
      gender: patient_gender,
      height: patient_height,
      address: patient_address,
    },
  ];

  const handleEvent = (event) => {
    event.preventDefault();
    //    alert(`${patient_name}'s record is saved`);
    //    console.log(
    //    patient_name,
    //    patient_address,
    //    patient_age,
    //    patient_gender,
    //    patient_id
    // );
  };

  const firebaseStore = async (secretKey, ciphertext) => {
    console.log("inside firebase");
    console.log(`secretKey is ${secretKey} data is ${ciphertext}`);
    await addDoc(connectionRef, {
      secKey: secretKey,
      encryptData: ciphertext,
      projectID: connectionRef.id,
    });
    console.log("stored data");
    // console.log(`projectID is ${connectionRef.projectID}`);
    // console.log(`secreat key is ${secretKey} and data is ${ciphertext}`);
    console.log("after encryption in firebase");
  };;

  const SearchableEncryption = (params) => {
    var crypto = require("crypto-js");
    const secretKey = "my-secret-key@123";
    var ciphertext = crypto.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    //log encrypted data
    console.log("Encrypt Data -");
    console.log(ciphertext);

    console.log("before calling firebase");
    firebaseStore(secretKey, ciphertext);

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);
  };

  const { ethereum } = window;
  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  let contract;
  const connectContract = async () => {
    const Address = "0x6B37C97CE2404A6AaB614E99102A15C0efe5d7f3";
    //"0xD698932D2992aFA8085aE923ef2738c37b7bA587";
    const ABI = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_add",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_height",
            type: "uint256",
          },
        ],
        name: "create",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "get",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "add",
            type: "string",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "height",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "todos",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "add",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "height",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);
    // console.log(contract.address);
  };

  const changeData = async () => {
    connectMetamask();
    connectContract();
    const tx = await contract.create(
      patient_name,
      patient_address,
      patient_age,
      patient_gender,
      patient_height
    );
    SearchableEncryption();
    // const txReciept = await tx.wait();
    // console.log(txReciept);
  };

  const getContractData = async () => {
    connectMetamask();
    connectContract();
    const phrase = await contract.get(patient_id);
    console.log(phrase);
    if (phrase[0] === "") console.log("This is an empty index");
    // console.log(phrase[0]);
    // console.log(phrase[1]);
    // console.log(phrase[2]);
    // console.log(phrase[3]);
    // console.log(phrase[4]);
    setPatient_name(phrase[0]);
    setPatient_age(phrase[1]);
    setPatient_address(phrase[2]);
    setPatient_gender(phrase[3]);
    setPatient_height(phrase[4]);
  };

  // const changeData1 = async () => {
  //    const tx = await contract.set_reta("hi there");
  //    const txReciept = await tx.wait();
  //    console.log(txReciept);
  // };

  return (
    <div className="app">
      {/* <p>{contractData[1]}</p> */}
      <form onSubmit={handleEvent}>
        <div className="inputs">
          <h2>Smart Contract for Patient</h2>
          <br />
          <div class="row form-floating mb-2">
            <input
              type="text"
              value={patient_id}
              class="form-control"
              id="floatingInput"
              onChange={(e) => setPatient_id(e.target.value)}
              placeholder="Patient id"
            />
            <label for="floatingInput">Patient Id</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_name}
              onChange={(e) => setPatient_name(e.target.value)}
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label for="floatingInput">Patient Name</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_age}
              onChange={(e) => setPatient_age(e.target.value)}
              type="number"
              class="form-control"
              id="floatingInput"
              placeholder="number"
            />
            <label for="floatingInput">Age</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_gender}
              onChange={(e) => setPatient_gender(e.target.value)}
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label for="floatingInput">Gender</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_height}
              onChange={(e) => setPatient_height(e.target.value)}
              type="number"
              class="form-control"
              id="floatingInput"
              placeholder="number"
            />
            <label for="floatingInput">Height</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_address}
              onChange={(e) => setPatient_address(e.target.value)}
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label for="floatingInput">Address</label>
          </div>
        </div>

        {/* <button className="registerButton" onClick={changeData}>
          Register
        </button> */}
        {/* <button onClick={connectMetamask}>Connect to metamask</button>
        <p>
          <br />
          {account}
        </p>
        <button onClick={connectContract}>Connect to Contract</button> */}
        <br />
        <button className="registerButton" onClick={changeData}>
          Save
        </button>
        <br />
        <button className="doc_button_des" onClick={getContractData}>
          Read from contract
        </button>
        <br />
        <p>{patient_name}</p>
      </form>
    </div>
  );
}
// console.log("here is the data goes..")
export default Patient;