import React, { useState } from 'react';
import icon from '../../../assets/add.png';
import {
  addDoc,
  collection,
  getDoc,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firabase_config";

function TestPage() {
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

  const firebaseStore =async (ciphertext) => {
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

    firebaseStore(ciphertext);

    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    // log decrypted Data
    console.log("decrypted Data -");
    console.log(decryptedData);

    return secretKey;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formInputs);
    encrypt(formInputs);
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

  return (
    <div>
      <div><h2>Test Page for the input field</h2></div>
      <div class='mt-5'>
        <form onSubmit={handleSubmit} class="row g-3">
          {formInputs.map((input, index) => (
            <div class="row p-4 justify-content-center">
              <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <input type="text" class="form-control" name="testName" placeholder='Name' value={input.name} onChange={(e) => handleInputChange(e, index)} />
              </div>
              <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <input type="text" class="form-control" name="testResult" placeholder='Result' value={input.name} onChange={(e) => handleInputChange(e, index)} />
              </div>
              <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <button type="button" onClick={() => handleRemoveInput(index)}>Remove</button>
              </div>
              
            </div>
          ))}
          <div class="d-flex justify-content-center align-items-center"><img src={icon} onClick={handleAddInput}></img>
          </div>
          
          {/* <button type="button" onClick={handleAddInput}>Add Input</button> */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="container mt-5">
        <div class="card shadow mb-5">
          <div class="card-body">
            {/* <div>{report}</div> */}
            <table class="w-full text-lg text-left text-gray-500 dark:text-gray-400" > {/*style={{ 'max-width': '300px' }} */}
              <thead class="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" class="px-6 py-3">Test Name</th>
                <th scope="col" class="px-6 py-3">Test Result</th>
              </thead>
              <tbody>
                {/* <div>{getData[0].testName}</div> */}
                {/* <div>{getData[0].testResult}</div> */}
                {/* <div>{formInputs[0].testResult}</div> */}
                {getData.map((item,index) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th key={[index]} scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {getData[index].testName}</th>
                    <td>{getData[index].testResult }</td>
                  </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
      <div><button onClick={showDecryptedData}>Show Decrypted Data</button></div>
    </div>
  );
}

export default TestPage;
