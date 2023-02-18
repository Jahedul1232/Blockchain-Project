import { useState, useEffect } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../../../firabase_config";
// import {storage} from "./firebase"
import { v4 } from "uuid";
// let token = "";

// function RequestedData() {
//   const user = auth.currentUser.email;
//   const usersCollectionRef = collection(db, "request/HIS", user);
//   // console.log("use ", usersCollectionRef);
//   onSnapshot(usersCollectionRef, (docsSnap) => {
//     docsSnap.forEach((doc) => {
//       console.log(doc.data().email);
//     });
//   });
// }

function HospitalLoginLanding() {
  const [test1, setTest1] = useState("");
  const [result1, setResult1] = useState("");
  const [test2, setTest2] = useState("");
  const [result2, setResult2] = useState("");
  const [test3, setTest3] = useState("");
  const [result3, setResult3] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  var [email, setEmail] = useState(null);
  var [fileUpload, setFileUpload] = useState(null);
  // const connectionRef = collection(db, "temporary"); //Firebase connection
  var [text, setText] = useState("");
  // progress
  const [percent, setPercent] = useState(0);

  // useEffect(() => {
  //   const user = auth.currentUser.email;
  //   // setEmail(user);
  //   const usersCollectionRef = collection(db, "request/HIS", user);
  //   // console.log("use ", usersCollectionRef);
  //   onSnapshot(usersCollectionRef, (docsSnap) => {
  //     docsSnap.forEach((doc) => {
  //       console.log(doc.data().email);
  //     });
  //   });
  // }, []);

  var data = [
    {
      test1: test1,
      test2: test2,
      test3: test3,
      result1: result1,
      result2: result2,
      result3: result3,
    },
  ];

  const firebaseStore = async (secretKey, ciphertext, email) => {
    console.log("inside firebase");
    console.log(`secretKey is ${secretKey} data is ${ciphertext}`);
    await setDoc(doc(db, "temporary", email), {
      data: ciphertext,
      key: secretKey,
      timeStamp: serverTimestamp(),
    });
    alert("Data stored in firebase");
  };

  const SearchableEncryption = (params) => {
    var crypto = require("crypto-js");
    // const secretKey = "my-secret-key@123";
    const secretKey = params;
    var ciphertext = crypto.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    firebaseStore(secretKey, ciphertext, email);
    console.log("ciphertext is : ", ciphertext);
    console.log("secret key is : ", secretKey);

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);

    // return secretKey;
  };

  function SaveButton() {
    console.log(
      "Results are : ",
      test1,
      " : ",
      result1,
      test2,
      " : ",
      result2,
      test3,
      " : ",
      result3
    );
    SearchableEncryption(token);
    alert(email, " data is saved");
  }

  function shareButton() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // console.log("Token is : ", result);
    setText("Your Data is Linked to this token : ");
    setToken(result);
  }

  const uploadFile = async () => {
    // Create a root reference
    // const storage = getStorage();
    if (fileUpload == null) {
      alert("File cannot be empty!");
      return;
    } else if (email == null) {
      alert("Please Enter Patient Email ID!");
      return;
    }

    const fileRef = ref(storage, `files/${email}/${fileUpload.name + v4()}`);
    // const uploadTask = uploadBytesResumable(fileRef, fileUpload);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("File uploaded successfully");
      setEmail(null);
      setFileUpload(null);
    });
  };

  return (
    <div>
      {/* <form> */}
      <div class="row p-5 justify-content-center">
        <div class="col-sm-6 col-md-10 col-lg-10 col-xl-10 mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Patient Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>
      <div class="row p-4 justify-content-center">
        <div class=" col-6 col-md-6 col-lg-3 col-xl-3">
          <div class="">
            <h4>Test name</h4>
          </div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Test name 1"
              onChange={(e) => setTest1(e.target.value)}
            />
          </div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Test name 2"
              onChange={(e) => setTest2(e.target.value)}
            />
          </div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Test name 3"
              onChange={(e) => setTest3(e.target.value)}
            />
          </div>
        </div>

        <div class="col-6 col-md-6 col-lg-3 col-xl-3">
          <div class="">
            <h4>Result</h4>
          </div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Result 1"
              onChange={(e) => setResult1(e.target.value)}
            />
          </div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Result 2"
              onChange={(e) => setResult2(e.target.value)}
            />
          </div>
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Result 3"
              onChange={(e) => setResult3(e.target.value)}
            />
          </div>
        </div>
        <div class="col-sm-10 col-md-10 col-lg-5 col-xl-5 mt-4 pt-3">
          <div class="card ">
            <div class="card-body ml-3 mr-3">
              <h5 class="card-title">Medical File Upload</h5>
              <input
                class="form-control"
                type="file"
                // id="formFileMultiple"
                onChange={(e) => {
                  setFileUpload(e.target.files[0]);
                }}
                // value={fileUpload}
                // multiple
              />
              <button class="btn btn-primary mt-3" onClick={uploadFile}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}
      <button class="btn btn-primary " onClick={SaveButton}>
        Save
      </button>
      <button class="btn btn-primary m-5" onClick={shareButton}>
        Share Data with Patient
      </button>

      <div>
        <div class="row p-4 justify-content-center">
          <div class="card col-lg-4">
            <div class="card-header">Request</div>
          </div>
        </div>
        {text}
        {token}
      </div>
    </div>
  );
}

export default HospitalLoginLanding;
