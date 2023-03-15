import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
// import {firebase.auth} from "firebase";
// import { getAuth } from "firebase/auth";
import { db, auth } from "../../../firabase_config";
import { async } from "@firebase/util";
let temp = 0;
let t = 0;
let interval = "";

function PatientfromHIS() {
  const [request, setRequest] = useState("");
  var [test1, setTest1] = useState("");
  var [result1, setResult1] = useState("");
  var [test2, setTest2] = useState("");
  var [result2, setResult2] = useState("");
  var [test3, setTest3] = useState("");
  var [result3, setResult3] = useState("");
  var [colon, setColon] = useState("");
  var [email, setEmail] = useState("");
  var [recordCiphertext, setRecordCiphertext] = useState("");
  const navigate = useNavigate();
  const connectionRef = collection(db, "records");
  // var [time, setTime] = useState(0);

  const firebaseStore = async (ciphertextRecords, keySecret, userEmail) => {
    const id = auth.currentUser.uid;
    console.log("id is ", id);
    try {
      const docRef = await addDoc(
        collection(db, "records", id, "Medical-record"),
        {
          record: ciphertextRecords,
          key: keySecret,
          // age: age,
          // Add any additional fields here
        }
      );
      // console.log("encrypted ciphertext for firebase is : ", ciphertext);
      //Previoud delete code
      await deleteDoc(doc(db, "temporary", userEmail));
      alert("You have got your data from Hospital");
    } catch (error) {
      alert("Error adding the documents");
      // console.error("Error adding document: ", error);
    }
  };

  const makingDataOwn = async (data) => {
    const useremail = await auth.currentUser.email;
    console.log("inside makingDataown is : ", data);

    var crypto = require("crypto-js");
    const secretKey = "my-secret-key@123";
    // var secretKey = "key";
    console.log("Here is the decrypted version...");
    //
    //
    // Decrypt
    //
    var bytes = crypto.AES.decrypt(data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);

    //Encrypt data again to take the Ownership

    const secretKeyOwn = "my-secret-key@123";
    // // var secretKey = "key";
    // // var ciphertext = data;
    var ciphertextRecords = crypto.AES.encrypt(
      JSON.stringify(decryptedData),
      secretKeyOwn
    ).toString();

    firebaseStore(ciphertextRecords, secretKeyOwn, useremail);
    // console.log("ciphertext is : ", ciphertext);
    // console.log("secret key is : ", secretKey);
    // Decrypt
    // var bytes = crypto.AES.decrypt(data, secretKey);
    // var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    // //log decrypted Data
    // console.log("decrypted Data -");
    // console.log(decryptedData);
  };

  const fetchData = async () => {
    const user = auth.currentUser.email;
    setEmail(user);
    // UserRecord userRecord = FirebaseAuth.getInstance.getUser(uid);
    // console.log("user is : ", email);
    var docRef = doc(db, "temporary", user);
    console.log("before await");
    if (temp <= 0) {
      console.log(`before  t is ${t} temp is ${temp}`);
      var docSnap = await getDoc(docRef);
      console.log(`after  t is ${t} temp is ${temp}`);
      if (docSnap.exists() && temp <= 0) {
        console.log("temp before is : ", temp);
        temp = temp + 1;
        console.log(docSnap.data());
        console.log("temp after is : ", temp);
        alert("your data is stored in firebase");
        makingDataOwn(docSnap.data().data);
        clearInterval(interval);
        console.log("cleared the interval");
        t = t + 1;
        return;
      } else {
        console.log("else of decsnap");
      }
    }
  };

  if (t <= 0) {
    interval = setInterval(fetchData, 10000);
    // t = t + 1;
  }

  // function read() {
  //   console.log("Inside read temp is ", temp);
  //   temp = temp + 1;
  //   if (temp >= 10) {
  //     clearInterval(interval);
  //     console.log("inside clear ", temp);
  //   }
  // }

  // fetchData();
  // if (temp <= 10) {
  //   // fetchData();
  //   console.log("inside settimeout", temp);
  // } else {
  //   console.log("perfect");
  //   temp = temp + 1;
  // }
  console.log("the end");

  const RequestData = async () => {
    const userID = auth.currentUser.uid;
    const cityRef = doc(db, `request/HIS`, request, email);
    // const cityRef = doc(db, `cities`, request, email, "key");
    setDoc(
      cityRef,
      { email: email },
      { timestamp: serverTimestamp },
      { merge: true }
    )
      .then(function () {
        alert("Request is send to the Hospital Information System.");
        setRequest("");
        navigate("/loginLanding", { state: { userID: userID } });
      })
      .catch((e) => {
        // console.log("error in adding");
        alert("Error in requesting ");
      });
  };
  // fetchData();
  // const ReadData = async () => {
  //   // console.log("Here will be printed");
  //   // const user = auth.currentUser.email;
  //   // // UserRecord userRecord = FirebaseAuth.getInstance.getUser(uid);
  //   // console.log("user is : ", user);
  //   // var docRef = doc(db, "temporary", user);
  //   // var docSnap = await getDoc(docRef);
  //   // if (docSnap.exists()) {
  //   //   alert("your data is stored in firebase");
  //   // } else {
  //   //   alert("Your data is not added");
  //   // }
  // };

  return (
    <div class="container">
      <div>
        <h3>Welcome here</h3>
      </div>
      <div class="d-flex justify-content-center">
        <div class="card col-sm-8 col-md-8 col-lg-8 col-xl-8 shadow-lg">
          <div class="card-header">Read Data X</div>
          <div class="card-body">
            <div class="d-flex px-3">
              <input
                class="form-control me-2"
                onChange={(e) => setRequest(e.target.value)}
                value={request}
                type="text"
                placeholder="Enter Hospital ID for Data Request."
              />
              <button
                class="btn btn-secondary text-nowrap"
                onClick={RequestData}
              >
                Request
              </button>
            </div>
            <div class="text-start m-5">
              <table class="table table-borderless">
                {/* <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead> */}
                <tbody>
                  <tr>
                    <th scope="row">
                      <h5>{test1}</h5>
                    </th>
                    <td>
                      <h5>{result1}</h5>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <h5>{test2}</h5>
                    </th>
                    <td>
                      <h5>{result2}</h5>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <h5>{test3}</h5>
                    </th>
                    <td colspan="3">
                      <h5>{result3}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientfromHIS;
