import { useState, useEffect } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {db} from "../../../firabase_config"
// let token = "";

function HospitalLoginLanding() {
  const [test1, setTest1]= useState("");
  const[result1, setResult1] = useState("");
  const [test2,setTest2]= useState("");
  const[result2, setResult2] = useState("");
  const [test3, setTest3]= useState("");
  const[result3, setResult3] = useState("");
  const [token,setToken] = useState("");
  // const connectionRef = collection(db, "temporary"); //Firebase connection
  var [text,setText]= useState("")

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

  const firebaseStore = async (secretKey, ciphertext, params) => {
    console.log("inside firebase");
    console.log(`secretKey is ${secretKey} data is ${ciphertext}`);
    await setDoc(doc(db, "temporary", params), {
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

    firebaseStore(secretKey, ciphertext, params);
    console.log("ciphertext is : ",ciphertext)
    console.log("secret key is : ",secretKey)

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    //log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);

    // return secretKey;
  };


  function SaveButton()
  {
    console.log("Results are : ",test1," : ",result1,test2," : ",result2,test3," : ",result3)
    SearchableEncryption(token);
  }

  function shareButton(){
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    // console.log("Token is : ", result);
    setText("Your Data is Linked to this token : ")
    setToken(result)
  }

    return (
    <div>
      <form>
        <div class="row p-4 justify-content-center">
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <h4>Test name</h4>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <h4>Result</h4>
          </div>
        </div>
        <div class="row p-4 justify-content-center">
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <input type="text" class="form-control" placeholder="Test name 1" 
            onChange={(e)=>setTest1(e.target.value)} />
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <input type="text" class="form-control" placeholder="Result" 
            onChange={(e)=>setResult1(e.target.value)} />
          </div>
        </div>
        <div class="row p-4 justify-content-center">
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <input type="text" class="form-control" placeholder="Test name 2" 
            onChange={(e)=>setTest2(e.target.value)}/>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <input type="text" class="form-control" placeholder="Result" 
            onChange={(e)=>setResult2(e.target.value)}/>
          </div>
        </div>
        <div class="row p-4 justify-content-center">
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <input type="text" class="form-control" placeholder="Test name 3" 
            onChange={(e)=>setTest3(e.target.value)}/>
          </div>
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <input type="text" class="form-control" placeholder="Result" 
            onChange={(e)=>setResult3(e.target.value)}/>
          </div>
        </div>
      </form>
      <button class="btn btn-primary" onClick={SaveButton}> Save </button>
      <button class="btn btn-primary m-5" onClick={shareButton}>Share Data with Patient</button>
      <div>
        {text}{token}
      </div>
    </div>);
  }
  
  export default HospitalLoginLanding;
  