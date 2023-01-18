import { React, useState, useEffect } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
// import {firebase.auth} from "firebase";
// import { getAuth } from "firebase/auth";
import { db, auth } from "../../../firabase_config";
import { async } from "@firebase/util";
let temp = 0;
let t = 0;
let interval = "";

function PatientfromHIS() {
  const [token, setToken] = useState("");
  var [test1, setTest1] = useState("");
  var [result1, setResult1] = useState("");
  var [test2, setTest2] = useState("");
  var [result2, setResult2] = useState("");
  var [test3, setTest3] = useState("");
  var [result3, setResult3] = useState("");
  var [colon, setColon] = useState("");
  var [email, setEmail] = useState("");
  // var [time, setTime] = useState(0);

  const fetchData = async () => {
    const user = auth.currentUser.email;
    setEmail(user);
    // UserRecord userRecord = FirebaseAuth.getInstance.getUser(uid);
    console.log("user is : ", user);
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
        clearInterval(interval);
        console.log("cleared the interval");
        return;
      } else {
        console.log("else of decsnap");
      }
    }
  };

  if (t <= 0) {
    interval = setInterval(fetchData, 5000);
    t = t + 1;
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
                onChange={(e) => setToken(e.target.value)}
                value={token}
                type="text"
                placeholder="Read with the token"
              />
              <button class="btn btn-secondary text-nowrap" onClick={""}>
                Read Data
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
