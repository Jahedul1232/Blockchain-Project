import { React, useState } from "react";
import "./doctorsLandingPage.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firabase_config";

function DoctorsLandingPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [add, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  console.log("here we are ");

  const Read = async (params) => {
    if (params === "") {
      alert("Input cannot be null");
      setAddress(" ");
      setAge(" ");
      setGender(" ");
      setHeight(" ");
      setName(" ");
      return 0;
    }

    const docRef = doc(db, "temporary", params);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log(docSnap.data().data);
      setCiphertext(docSnap.data().data);
      setKey(docSnap.data().key);
      // console.log(data, k);
      // return docSnap.data().data;
    } else {
      alert("No such Documents!");
    }
  };

  const decryptData = async () => {
    var crypto = require("crypto-js");
    // const secretKey = "my-secret-key@123";

    console.log(key);
    console.log("cipher si ", ciphertext);
    // Decrypt
    var bytes = crypto.AES.decrypt(ciphertext, key);
    var decryptedData = await JSON.parse(bytes.toString(crypto.enc.Utf8));
    console.log(decryptedData[0].name);
    setName(decryptedData[0].name);
    setAddress(decryptedData[0].address);
    setAge(decryptedData[0].age);
    setGender(decryptedData[0].height);
    setHeight(decryptedData[0].gender);
    console.log("read successfully");
  };

  const ReadData = () => {
    console.log("Read data");
    Read(token);
    console.log("afrer read");
    console.log("before decrypt");
    decryptData();
  };
  return (
    <div>
      <div className="doctorsbox">
        <div>
          <h5>Welcome to Doctors langing page</h5>
        </div>
        <br />
        <br />
        <form>
          {/* <div class="flex flex-row items-center justify-center lg:justify-start"> */}

          {/* <!-- Email input --> */}
          <div class="mb-6">
            <input
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              onChange={(e) => setToken(e.target.value)}
              value={token}
              // onClick={navigateToPatient}
              placeholder="Email address"
            />
          </div>
        </form>
        <button className="tokenButton" onClick={ReadData}>
          Read Data
        </button>
        <h5>{name}</h5>
        <h5>{age}</h5>
        <h5>{gender}</h5>
        <h5>{height}</h5>
        <h5>{add}</h5>
      </div>
    </div>
  );
}

export default DoctorsLandingPage;
