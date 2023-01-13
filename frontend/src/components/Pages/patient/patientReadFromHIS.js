import { React, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firabase_config";

function PatientfromHIS() {
  const [token, setToken] = useState("");
  var [test1, setTest1] = useState("");
  var [result1, setResult1] = useState("");
  var [test2, setTest2] = useState("");
  var [result2, setResult2] = useState("");
  var [test3, setTest3] = useState("");
  var [result3, setResult3] = useState("");
  var [colon, setColon] = useState("");

  const ReadData = async () => {
    console.log("TOken is ", token);
    if (token === "") {
      alert("Input cannot be null");
      setToken("");
      setTest1("");
      setTest2("");
      setTest3("");
      setResult1("");
      setResult2("");
      setResult3("");
      setColon("");
    } else {
      var docRef = doc(db, "temporary", token);
      var docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var timeNow = Math.floor(Date.now() / 1000);
        var timeSavedData = docSnap.data().timeStamp.seconds;
        // console.log("Clou timeStamp is ", timeSavedData);
        // console.log("local timeStamp is ", timeNow);
        // console.log(timeNow - timeSavedData);
        if (timeNow - timeSavedData >= 1) {
          var cipher = docSnap.data().data;
          var k = docSnap.data().key;

          var crypto = require("crypto-js");
          // const secretKey = "my-secret-key@123";

          //   console.log("k is: ", k);
          //   console.log("cipher is ", cipher);
          // Decrypt
          var bytes = crypto.AES.decrypt(cipher, k);
          var decryptedData = await JSON.parse(bytes.toString(crypto.enc.Utf8));
          console.log(decryptedData);
          setTest1(decryptedData[0].test1);
          setTest2(decryptedData[0].test2);
          setTest3(decryptedData[0].test3);
          setResult1(decryptedData[0].result1);
          setResult2(decryptedData[0].result2);
          setResult3(decryptedData[0].result3);
          setColon(" : ");

          console.log("in dosnap");
        } else {
          await deleteDoc(doc(db, "temporary", token));
          alert("Token ID is not valid");
          setToken("");
          setTest1("");
          setTest2("");
          setTest3("");
          setResult1("");
          setResult2("");
          setResult3("");
          setColon("");
        }
        // console.log(docSnap.data().data);

        // return docSnap.data().data;
      } else {
        alert("No such Documents!");
        //   setAddress("");
        //   setName("");
        setTest1("");
        setTest2("");
        setTest3("");
        setResult1("");
        setResult2("");
        setResult3("");
        setColon("");
      }
    }
  };
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
              <button class="btn btn-secondary text-nowrap" onClick={ReadData}>
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
