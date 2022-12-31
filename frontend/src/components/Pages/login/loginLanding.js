import React, { useState } from "react";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { db } from "../../../firabase_config";
import { async } from "@firebase/util";
import "./loginLanding.css";

const LoginLandingPage = () => {
  // const [user, setUser] = useState();
  let [account, setAccount] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [add, setAddress] = useState("");
  const [height, setHeight] = useState("");

  const { ethereum } = window;
  const location = useLocation();
  const docRef = doc(db, "records", location.state.userID);
  let contract;
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
  };

  const decryptData = async () => {
    var crypto = require("crypto-js");
    // const secretKey = "my-secret-key@123";

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, key);
    var decryptedData = await JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);
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
  const getContractData = async () => {
    //   ---------- > Connect to metamask  <-------------
    connectMetamask();
    // --------> Connection with Contract <---------------
    connectContract();
    // Reading from blockchain
    // const phrase = await contract.retrieve();
    ReadBlockchain();
    Read();
    decryptData();
    // console.log(phrase,)
  };

  getContractData();

  return (
    <div>
      <div>
        <h3>{name}'s Information</h3>
        <div className="table1">
          <table>
            <tr>
              <td>
                <b>
                  <th>Name : </th>
                </b>
              </td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>
                <b>
                  <th>Age :</th>
                </b>
              </td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>
                <b>
                  <th>Gender :</th>
                </b>
              </td>
              <td>{gender}</td>
            </tr>

            <tr>
              <td>
                <b>
                  <th>Height : </th>
                </b>
              </td>
              <td>{height}</td>
            </tr>
            <tr>
              <td>
                <b>
                  <th>Address : </th>
                </b>
              </td>
              <td>{add}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};;

export default LoginLandingPage;
