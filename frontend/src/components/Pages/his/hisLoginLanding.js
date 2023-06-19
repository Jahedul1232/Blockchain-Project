import { useState, useEffect } from "react";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import icon from "../../../assets/add.png";
import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../../../firabase_config";
// import {storage} from "./firebase"
import { v4 } from "uuid";
import { async } from "@firebase/util";
var nameArray = [];

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

const outsideCall = () => {};

function HospitalLoginLanding() {
  var [formInputs, setFormInputs] = useState([{ testName: '', testResult: '' }]);
  var [getData, setData] = useState([]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const inputs = [...formInputs];
    inputs[index][name] = value;
    setFormInputs(inputs);
  };

  const handleAddInput = () => {
    setFormInputs([...formInputs, { testName: '', testResult: '' }]);
  };

  const handleRemoveInput = (index) => {
    const inputs = [...formInputs];
    inputs.splice(index, 1);
    setFormInputs(inputs);
  };

  const fireStore =async (ciphertext) => {
    console.log("inside firebase");
    console.log(`data is ${ciphertext}`);
    await setDoc(doc(db, "testRecords",'records'), {
      data: ciphertext,
      // key: secretKey,
      timeStamp: serverTimestamp(),
    });
  }


  const encrypt = (text) => {
    var crypto = require("crypto-js");
    const secretKey = "my-secret-key@123";
    var ciphertext = crypto.AES.encrypt(
      JSON.stringify(text),
      secretKey
    ).toString();

    console.log("ciphertext is : ", ciphertext);

    // fireStore(ciphertext);
    const secret = "my-secret-key@123";
    firebaseStore(secret, ciphertext, email)
    alert("Data stored successfully")
    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    // log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);

    return secretKey;
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(formInputs);
    encrypt(formInputs);
    setEmail("")
    await deleteDoc(doc(db, "request/HIS", user, email));
  };
  const showDecryptedData = async () => {
    var crypto = require("crypto-js");
    const docRef = doc(db, "testRecords", "records");
    let sKey = "my-secret-key@123";
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let cipher = docSnap.data().data;
      // setData(docSnap.data().data);
      console.log("From firestore decrypted data is : ", cipher);
       // Decrypt
    var bytesfromFirebase = crypto.AES.decrypt(cipher, sKey);
    var decryptedDataFirebase = JSON.parse(bytesfromFirebase.toString(crypto.enc.Utf8));

    // log decrypted Data
    console.log("decrypted Data from firebase is  -");
      console.log(decryptedDataFirebase);
      setData(decryptedDataFirebase);
    } else {
      alert("No such Documents!");
    }
  }

  // const [docs, loading, error] = useCollectionData(query);
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
  var [emailArray, setEmailArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const[user,setUser] = useState('');
  // const connectionRef = collection(db, "temporary"); //Firebase connection
  var [text, setText] = useState("");
  var unique = [];
  // progress
  const [percent, setPercent] = useState(0);
  // var emailArr = [];

  const firstCall = async () => {
    nameArray = [];
    const user = auth.currentUser.email;
    setUser(user);
    // setEmail(user);
    const usersCollectionRef = collection(db, "request/HIS", user);
    // console.log("use ", usersCollectionRef);
    await onSnapshot(usersCollectionRef, (docsSnap) => {
      console.log(docsSnap.size);
      docsSnap.forEach((doc) => {
        // console.log(doc.data().email);
        // setEmail(doc.data().email);
        // emailArray.push(doc.data().email);
        nameArray.push(doc.data().email);
      });
      unique = nameArray.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      console.log(unique);
      setEmailArray([...unique]);
      // console.log(unique);
      console.log("unique value is : ", emailArray);
    });
  };

  useEffect(() => {
    firstCall();
  }, []);

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
  console.log("data is : ", data);

  const firebaseStore = async (secretKey, ciphertext, email) => {
    console.log("inside firebase");
    console.log(`secretKey is ${secretKey} data is ${ciphertext}`);
    await setDoc(doc(db, "temporary", email), {
      data: ciphertext,
      key: secretKey,
      timeStamp: serverTimestamp(),
    });
    alert("Data stored in firebase");
    console.log(
      "after encryption : ",
      ciphertext,
      "  Secret key is : ",
      secretKey
    );
  };

  const SearchableEncryption = () => {
    var crypto = require("crypto-js");
    const secretKey = "my-secret-key@123";
    // const secretKey = "key";
    var ciphertext = crypto.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    firebaseStore(secretKey, ciphertext, email);
    console.log("ciphertext is : ", ciphertext);
    console.log("secret key is : ", secretKey);

    // Decrypt;
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);

    // return secretKey;
  };;

  const SaveButton =async()=>{
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
    SearchableEncryption();
    alert(email, " data is saved");
    //Deleting data from firebase 
    await deleteDoc(doc(db, "request/HIS", user, email));
    await firstCall();
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

  function getDataTime() {
    // var today = new Date();
    // var date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
    // var time =
    //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date + " " + time;
    var timeNow = Math.floor(Date.now() / 1000);
    console.log(timeNow);
  }

  const uploadFile = async () => {
    if (fileUpload == null) {
      alert("File cannot be empty!");
      return;
    } else if (email == null) {
      alert("Please Enter Patient Email ID!");
      return;
    }

    getDataTime();

    // var crypto = require("crypto-js");
    // // const secretKey = "my-secret-key@123";
    // const secretKey = "secretKey";
    // var ciphertext = crypto.AES.encrypt(fileUpload, secretKey);
    // console.log("file encrypted");

    const fileRef = ref(storage, `files/${email}/${fileUpload.name + v4()}`);
    // const uploadTask = uploadBytesResumable(fileRef,     fileUpload);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("File uploaded successfully");
      setEmail(null);
      setFileUpload(null);
    });
    getDataTime();
    // var decrypted = crypto.AES.decrypt(ciphertext, secretKey);
    // console.log("file decrypted");
  };

  return (
    <div>
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
     {/* <div class="row p-4 justify-content-center">
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
                multiple
              />
              <button class="btn btn-primary mt-3" onClick={uploadFile}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <button class="btn btn-primary " onClick={SaveButton}>
        Save
      </button>
      <button class="btn btn-primary m-5" onClick={shareButton}>
        Share Data with Patient
      </button> */}

      {/*........................   start.................................*/}

      
      {/* <div><h2>Test Page for the input field</h2></div> */}
      <div class='container'>
      <div class='mt-5 row' >
        <div class='col-sm-8 col-md-8 col-lg-8 col-xl-8'>
    
            <form onSubmit={handleSubmit}>
              <div class="row">
                <div class='col-5'><h4> Test Name</h4></div>
                <div class='col-5'><h4> Test Result</h4></div>
              </div>
          {formInputs.map((input, index) => (
            <div class="row p-4 justify-content-center">
              <div class="col-5 col-sm-5 col-md-5 col-lg-5">
                <input type="text" class="form-control" name="testName" placeholder='Name' value={input.name} onChange={(e) => handleInputChange(e, index)} />
              </div>
              <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <input type="text" class="form-control" name="testResult" placeholder='Result' value={input.name} onChange={(e) => handleInputChange(e, index)} />
              </div>
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <button class="btn btn-outline-danger" type="button" onClick={() => handleRemoveInput(index)}> &#128465;</button>
              </div>
              
            </div>
          ))}
              <div class="d-flex justify-content-center align-items-center">

                {/* <button class='btn btn-primary' onClick={handleAddInput}> <h2 className="m-0">+</h2></button> */}
                <img src={icon} onClick={handleAddInput} />
                <button class="btn btn-primary m-3"  type="submit">Submit</button>
              </div>
              <div></div>
          
          {/* <button type="button" onClick={handleAddInput}>Add Input</button> */}
          
          </form>
        </div>
        <div class='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
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
                multiple
              />
              <button class="btn btn-primary mt-3" onClick={uploadFile}>
                Upload
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
      {/* <div><button onClick={showDecryptedData}>Show Decrypted Data</button></div> */}
      

      {/*........................    End     ...................................*/}
      

      <div>
        <div class="row p-4 justify-content-center">
          <div class="card col-lg-4">
            <div class="card-header">Request</div>
            <ul>
              {/* // Mapping over array of friends */}
              {emailArray.map((arr, index) => (
                // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                <li key={index}>
                  <span>{arr}</span>
                </li>
              ))}
              {/* <button onClick={handleAddFriend}>Add Friends</button> */}
            </ul>
          </div>
        </div>
        {text}
        {token}
      </div>
    </div>
  );
}

export default HospitalLoginLanding;
