import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import {
  doc,
  docs,
  getDoc,
  getDocs,
  setDoc,
  getDocFromCache,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../../firabase_config";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import "./loginLanding.css";

let token = "";
let temp = 0;
let t = 0;
let interval = "";
const ShareData = async (ciphertext, key, token) => {
  // console.log(makeid(6));
  await setDoc(doc(db, "temporary", token), {
    data: ciphertext,
    key: key,
    timeStamp: serverTimestamp(),
  });
  console.log("From outside token is ", token);
  // setToken(token);
  // <div>
  //   <h3>Anayone can Read your Data with the token.</h3>
  // </div>;
  console.log("here");
  alert("Your Data is Linked to this token.");
};

const LoginLandingPage = () => {
  let [account, setAccount] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [recordCiphertext, setRecordCiphertext] = useState();
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [add, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  var [dataArray, setDataArray] = useState([]);
  // const [genete, setGenerate] = useState("");
  // const [user, setUser] = useState();

  const { ethereum } = window;
  const location = useLocation();
  const docRef = doc(db, "records", location.state.userID);
  let contract;

  const fetchData = async () => {
    const user = await auth.currentUser.uid;
    console.log("user is ", user);
    const recordRef = collection(db, "records");

    console.log("Data array is : ", dataArray);

    // var insideID = "sItLp1l7Aq1TQ0VY7G77";

    var parentDoc = collection(db, "records", user, "records");
    var parentDocId = parentDoc.id;
    console.log("ID is : ", parentDocId);
    // var docRef = doc(db, "records", user, "records");
    // console.log(docRef.id);
    // var docSnap = await getDoc(docRef);
    // const data = await collection(db, "records"); //.doc(user, records).get();
    // console.log("data is", data.data);
    // console.log(docSnap.data());
  };
  fetchData();

  useEffect(() => {
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      console.log("Token is : ", result);
      return result;
    }
    setToken(makeid(6));
  }, []);

  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  const connectContract = async () => {
    //----> Smart Contract Address <----
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

  const ReadBlockchain = async () => {
    const phrase = await contract.retrieve();
    console.log("from ReadBlockchain block key is ", phrase);
    setKey(phrase);
    // console.log(phrase);
  };

  const decryptData = async () => {
    var crypto = require("crypto-js");
    // const secretKey = "my-secret-key@123";

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, key);
    var decryptedData = await JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    // console.log("decrypted Data -");
    // console.log(decryptedData);
    // console.log("Name is ", decryptedData[0].name);
    setName(decryptedData[0].name);
    setAddress(decryptedData[0].address);
    setAge(decryptedData[0].age);
    setGender(decryptedData[0].height);
    setHeight(decryptedData[0].gender);
    // alert("Data is decrypted Successfully.....");
    console.log("read successfully");
  };

  const Read = async (params) => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCiphertext(docSnap.data().data);
      // setName(docSnap.data().key);
    } else {
      alert("No such Documents!");
    }
  };

  const getContractDatadata = async () => {
    //   ---------- > Connect to metamask  <-------------
    connectMetamask();
    // --------> Connection with Contract <--------------
    connectContract();
    // Reading from blockchain
    // const phrase = await contract.retrieve();
    ReadBlockchain();
    Read();

    decryptData();
    console.log("Data decrypted");
    // setToken(makeid(6));
    // console.log(phrase,)
  };
  getContractDatadata();
  function ReadDatafromHIS() {
    navigate("/patientfromHIS");
  }

  return (
    <div class="">
      <div class="container"></div>
      <h2>Personal Information</h2>
      <div class="row justify-content-center mt-5">
        <div class="m-auto card rounded-4 col-10 col-sm-8 col-md-8 col-lg-5 col-xl-5 shadow-lg">
          <div class="card-body">
            <div>
              <h3>{name}'s Information</h3>
              <div className="table1">
                <table className="text-start">
                  <tr>
                    <td>
                      <b>Patient Name : </b>
                    </td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Patient Age : </b>
                    </td>
                    <td>{age}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Patient Height : </b>
                    </td>
                    <td>{gender}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>
                        <th>Patient Gender : </th>
                      </b>
                    </td>
                    <td>{height}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        <th>Patient Address : </th>
                      </b>
                    </td>
                    <td>{add}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="mt-5">
              <h5>Do you want to share your data with this token? : {token}</h5>
              <button
                onClick={() => ShareData(ciphertext, key, token)}
                class="btn btn-primary m-5"
              >
                Share Data
              </button>
              <button class="btn btn-primary" onClick={ReadDatafromHIS}>
                Read Data
              </button>
              <div>
                {dataArray.map((item) => (
                  <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              {/* <h3>Anyone can Rea</h3> */}
            </div>
          </div>
        </div>
        <div class="m-auto col-12 col-sm-8 col-md-8 col-lg-4 col-xl-4">
          <img
            class=""
            src="https://clariness.com/wp-content/uploads/2021/08/undraw_personal_information_re_vw8a.svg"
            alt="Sample image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginLandingPage;
