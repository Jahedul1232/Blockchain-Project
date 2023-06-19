import React, { useEffect, useState , useRef, useCallback  } from "react";
import { ethers } from "ethers";
import { useCollectionData } from "react-firebase-hooks/firestore"; 
// import { useLocation } from "react-router-dom"; 
import {
  doc,
  docs,
  getDoc,
  getDocs,
  setDoc,
  getDocFromCache, 
  collection,
  serverTimestamp,
  Query,
} from "firebase/firestore";
import { db, auth } from "../../../firabase_config";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import "./loginLanding.css";


const ShareData = async (ciphertext, key, token) => {
  // console.log(makeid(6));
  await setDoc(doc(db, "temporary", token), {
    data: ciphertext,
    key: key,
    timeStamp: serverTimestamp(),
  });
  // console.log("From outside token is ", token);
  // setToken(token);
  // <div>
  //   <h3>Anayone can Read your Data with the token.</h3>
  // </div>;
  // console.log("here");
  alert("Your Data is Linked to this token.");
};

const LoginLandingPage = () => {
  // console.log("repeated print")
  const [data_records, setData_records] = useState([])
  const [doc_id, setDoc_id] = useState();
  var [getData, setData] = useState([]);
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
  const [report, setReport] = useState("");
  const navigate = useNavigate();

  let [testArray, setTestArray] = useState([]);
  let [resultArray, setResultArray] = useState([]);
  var [testName,setTestName] = useState();
  var [resultName, setResultName] = useState();
  const fetchedDocuments = [];
  const [jsonData, setJsonData] = useState([]);
  const [encryptData, setEncrypData] = useState([]); 
  const [userID, setUserID] = useState();
  


  var crypto = require("crypto-js");
  let hasRunOnce = useRef(false);

  const { ethereum } = window;
  // const location = useLocation();
  // console.log("Location is : ",location);
  
  // console.log(docRef)
  let contract;      
  let val_temp = 0;

  const fetchData = async (recordsDocs) => {
    // const user = await auth.currentUser.uid;    
    // console.log("inside fetchData", recordsDocs[0]);
    val_temp = 1;
    // console.log("val_temp is ",val_temp)
    if (recordsDocs.length > 0) {
      // console.log("inside if condition.....");
      // console.log("docs are : ", recordsDocs);
      let dataDocs = recordsDocs[0].record;
      // console.log("specific ciphertext is : ", dataDocs);
      
      // const secretKey = "my-secret-key@123";
      let keySecret = "my-secret-key@123";

      // Decrypt
      let recordsBytes = crypto.AES.decrypt(dataDocs, keySecret);
      let decryptedRecords = await JSON.parse(
        recordsBytes.toString(crypto.enc.Utf8)
      );
      // console.log("decrypted data is : ", decryptedRecords[0]);
      // setDataArray(decryptedRecords);
      // console.log("first values are : ", decryptedRecords[0].test1, decryptedRecords[0].result1);
      // var first_test = await decryptedRecords[0].test1;
      // var second_test = await decryptedRecords[0].test2;
      // var third_test = await decryptedRecords[0].test3;
      // var first_result =await decryptedRecords[0].result1;
      // var second_result =await decryptedRecords[0].result2;
      // var third_result =await decryptedRecords[0].result3;
      // console.log("first_test is : ", first_test);
      // setTestArray((testArray)=>[...testArray, first_test]);
      // setResultArray((resultArray)=>[...resultArray, first_result]);
      // setTestArray((testArray)=>[...testArray, second_test]);
      // setResultArray((resultArray)=>[...resultArray, second_result]);
      // setTestArray((testArray)=>[...testArray, third_test]);
      // setResultArray((resultArray) => [...resultArray, third_result]);
      setResultName("Result")
      setTestName("Test Name")

      hasRunOnce.current = true;
    } else {
      // console.log("there is no record");
    }
  };
  // const user = auth.currentUser.uid;       
  const user = localStorage.getItem('userID');
  const query = collection(db, "records", user, "Medical-record");
  const [recordsDocs, loading, error] = useCollectionData(query);
  if (!hasRunOnce.current) {
    fetchData(recordsDocs);
    // console.log("inside fethch call...")
  }
  

  useEffect(() => {
    var userID = localStorage.getItem('userID');
    console.log("userID is : ",userID)
    setUserID(userID);
    getContractDatadata();
    // showDecryptedData();
    getRecords();
    // dataDecrypt();
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
      // console.log("Token is : ", result);
      return result;
    }
    setToken(makeid(6));


    function getData(data) {
      console.log("inside useEffect ",data)
    }
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
    // console.log("from ReadBlockchain block key is ", phrase);
    setKey(phrase);
    // console.log(phrase);
  };

  const decryptData = async () => {
    var crypto = require("crypto-js");
    // const secretKey = "my-secret-key@123";
    // console.log("ciphertext is : ", ciphertext);
    // console.log("key is : ", key);
    // Decrypt
    console.log("inside decryptData");      
    var bytes = await crypto.AES.decrypt(ciphertext, key);
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
    console.log("Name is : ", decryptedData[0].name);  
    console.log("read successfully");

    
  };

  const Read = async () => {
    const docRef = doc(db, "records", userID);
    const docSnap = await getDoc(docRef);
    console.log("if data exist or not :", docSnap.exists());
    if (docSnap.exists()) {
      setCiphertext(docSnap.data().data);
      console.log("data is : ", docSnap.data().data);
      // setName(docSnap.data().key);
    } else {
      alert("No such Documents!");
    }
  };
  const showDecryptedData = async () => {
    
    var crypto = require("crypto-js");
    const docRef = doc(db, "testRecords", "records");
    let sKey = "my-secret-key@123";
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let cipher = docSnap.data().data;
      // setData(docSnap.data().data);
      // console.log("From firestore decrypted data is : ", cipher);
       // Decrypt
    var bytesfromFirebase = crypto.AES.decrypt(cipher, sKey);
    var decryptedDataFirebase = JSON.parse(bytesfromFirebase.toString(crypto.enc.Utf8));

    // log decrypted Data
    // console.log("decrypted Data from firebase is  -");
      // console.log(decryptedDataFirebase);
      setData(decryptedDataFirebase);
    } else {
      alert("No such Documents!");
    }
  }

  // const addData = useCallback((decryptData) => {
  //   // const newData = 'New Data'; // Example: New data to be added to the array
  //   setData_records((data_records) => {
  //   const newArray = [...data_records];
  //   newArray.push(decryptData);
  //   return newArray;
  // });
  // }, []);

  const dataDecrypt = (ciphertext, timeStamp) => {
    console.log("inside dataDecrypt : ",ciphertext,timeStamp)
    var crypto = require("crypto-js");
    const secretKey = "my-secret-key@123";
    // console.log("ciphertext is : ", ciphertext);
    // console.log("key is : ", key);
    // Decrypt
    
    
    var bytesRecord = crypto.AES.decrypt(ciphertext, secretKey);
    console.log("call before error: ")
    const decryptedDataRecord = JSON.parse(bytesRecord.toString(crypto.enc.Utf8));
    console.log("decrypted Data is : ", decryptedDataRecord);

    // console.log(timeStamp);
    
    // console.log("decrypted Data is : ", decryptedData);
    // addData(decryptData);
    // console.log(decryptedData);
    // setData_records((data_records)=>[...data_records, decryptedData[0]]);
    // setTestArray((testArray)=>[...testArray, first_test]);
    //log decrypted Data
    // console.log("decrypted Data -");
    // console.log(decryptedData);
    // console.log("Name is ", decryptedData[0].name);
    // setName(decryptedData[0].name);
    // setAddress(decryptedData[0].address);
    // setAge(decryptedData[0].age);
    // setGender(decryptedData[0].height);
    // setHeight(decryptedData[0].gender);
    // alert("Data is decrypted Successfully.....");
    // console.log("read successfully");
    console.log("Code work share 10 "); 
    return decryptedDataRecord;

    
  };

  const getRecords = async () => {
    setJsonData([]);
    const user = localStorage.getItem("userID");
    // console.log("user1 is ...........",user1)
    // const user = auth.currentUser.uid;
    console.log("user is ................",user)
      try {
        const querySnapshot = await getDocs(collection(db, 'records',user, 'Medical-record')); 
        // const fetchedDocuments = [];
        console.log("code works here 1");
        querySnapshot.forEach((doc) => {
          fetchedDocuments.push({ id: doc.id, ...doc.data() });
        });
        console.log("code works here 2");

        // console.log("fetchedDocuments are : ", fetchedDocuments);
        // setEncrypData(fetchedDocuments);
        console.log("fetchedDocuments length is : ", fetchedDocuments.length);
        fetchedDocuments.forEach((document)  => {
          console.log("documnet is : ", document);
          console.log("code works here before call");
          
          var result = dataDecrypt(document.record, document.timeStamp);
 
           
          // result.then((res) => {
            // console.log("code works here 5",res);
          // const milliseconds = document.timestamp.seconds * 1000 + Math.floor(document.timestamp.nanoseconds / 1e6);
          const milliseconds = document.timeStamp.seconds*1000 + Math.floor(document.timeStamp.nanoseconds/ 1e6) ;

          // console.log("millisecordsn are : ",milliseconds);
          let dte = new Date(milliseconds);
          const formattedDateTime = dte.toLocaleString(); 
        console.log("code works here 6");
          // console.log(dte);  
          setJsonData((jsonData) => [...jsonData, [result, formattedDateTime]]);
        console.log("code works here 3");
          // result.push([document.record, document.timeStamp]);
        // });
        console.log("code works here 4");
          })
          // console.log("result is : ",result);
        
      } catch (error) {
        console.error('Error retrieving documents:', error);
      }
      console.log("jsonDatas are : ", jsonData); 
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

    // getRecords();


    // console.log("test name is :",jsonData[0][1].testName);
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
              {/* <div>
                {testArray.map((item,index) => (
                  <div >
                     <li key={index}>{item}</li>
                  </div>
                ))}
              </div> */}

              {/* <h3>Anyone can Rea</h3> */}
            </div>
          </div>
        </div>
        <div class="m-auto col-12 col-sm-8 col-md-8 col-lg-4 col-xl-4">
          <img
            class=""
            src="https://global-uploads.webflow.com/5dd07f6bc5a7ed039456e602/5f5fd64b71bab15ef7e39743_undraw_medicine_b1ol-2.svg"
            // src="https://clariness.com/wp-content/uploads/2021/08/undraw_personal_information_re_vw8a.svg"
            alt="Sample image"
          />
        </div>
      </div>
      <div>
        
{/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    Gray
                </td>
                <td class="px-6 py-4">
                    Phone
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch 5
                </th>
                <td class="px-6 py-4">
                    Red
                </td>
                <td class="px-6 py-4">
                    Wearables
                </td>
                <td class="px-6 py-4">
                    $999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div> */}

      </div>
      <div className="container mt-5">
        <div class="card shadow mb-5">
          <div class="card-body">
            {/* <div>{report}</div> */}
            {loading && "Loading.."}
            <table class="w-full text-lg text-left text-gray-500 dark:text-gray-400" >
              <tbody>
                {jsonData.map((item, index) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 row">
                    <th key={index} scope="row" class="col-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      
                      {index+1}&nbsp;&nbsp;&nbsp;&nbsp; { item[1]}</th>
                    <td class='col-9'> 
                  <table class='w-full'> 
              <thead class="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <th scope="col" class="col-5 px-6 py-6 ">{testName}</th>    {/*col-lg-4 col-md-4 m-5  px-6 py-6*/}
                <th scope="col" class="col-5 mr-5 ml-5">{resultName}</th>
              </thead>
                      <tbody>{item[0].map((it, ind) => (
                      <tr><td key={ind}>{it.testName}</td><td>{it.testResult}</td></tr>
                    ))}</tbody></table></td>
                  </tr>
                ))}

                {/* {data_records.map((item,index) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th key={[index]} scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {getData[index].testName}</th>
                    <td>{getData[index].testResult }</td>
                  </tr>
                ))} */}
                {/* <div>{data_records[0].testName}</div> */}

                </tbody>
            </table>


            {/* <div>
              {fetchedDocuments.map((item, index) => (
                {index}
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLandingPage;
