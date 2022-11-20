import { ethers } from "ethers";
import { useState } from "react";
import "./patient.css";
// import { db } from "../../firebase";

function Patient() {
  let [account, setAccount] = useState("");
  let [contractData, setContractData] = useState();
  const [patient_id, setPatient_id] = useState("");
  const [patient_name, setPatient_name] = useState("");
  const [patient_age, setPatient_age] = useState("");
  const [patient_gender, setPatient_gender] = useState("");
  const [patient_height, setPatient_height] = useState("");
  const [patient_address, setPatient_address] = useState("");

  const handleEvent = (event) => {
    event.preventDefault();
    // alert(`${patient_name}'s record is saved`);
    // console.log(
    //   patient_name,
    //   patient_address,
    //   patient_age,
    //   patient_gender,
    //   patient_id
    // );
  };

  const { ethereum } = window;
  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  let contract;
  const connectContract = async () => {
    const Address = "0x6B37C97CE2404A6AaB614E99102A15C0efe5d7f3";
    //"0xD698932D2992aFA8085aE923ef2738c37b7bA587";
    const ABI = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_add",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_height",
            type: "uint256",
          },
        ],
        name: "create",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "get",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "add",
            type: "string",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "height",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "todos",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "add",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "height",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);
    console.log(contract.address);
  };

  const changeData = async () => {
    const tx = await contract.create(
      patient_name,
      patient_address,
      patient_age,
      patient_gender,
      patient_height
    );
    const txReciept = await tx.wait();
    console.log(txReciept);
  };

  const getContractData = async () => {
    const phrase = await contract.get(12);
    console.log(phrase[0]);
    console.log(phrase[1]);
    console.log(phrase[2]);
    console.log(phrase[3]);
    console.log(phrase[4]);
    setPatient_name(phrase[0]);
  };

  // const changeData1 = async () => {
  //   const tx = await contract.set_reta("hi there");
  //   const txReciept = await tx.wait();
  //   console.log(txReciept);
  // };

  return (
    <div className="app">
      {/* <p>{contractData[1]}</p> */}
      <form onSubmit={handleEvent}>
        <div className="inputs">
          <h2>Register Patient</h2>
          <br />
          <div class="row form-floating mb-2">
            <input
              type="text"
              value={patient_id}
              class="form-control"
              id="floatingInput"
              onChange={(e) => setPatient_id(e.target.value)}
              placeholder="Patient id"
            />
            <label for="floatingInput">Patient Id</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_name}
              onChange={(e) => setPatient_name(e.target.value)}
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label for="floatingInput">Patient Name</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_age}
              onChange={(e) => setPatient_age(e.target.value)}
              type="number"
              class="form-control"
              id="floatingInput"
              placeholder="number"
            />
            <label for="floatingInput">Age</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_gender}
              onChange={(e) => setPatient_gender(e.target.value)}
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label for="floatingInput">Gender</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_height}
              onChange={(e) => setPatient_height(e.target.value)}
              type="number"
              class="form-control"
              id="floatingInput"
              placeholder="number"
            />
            <label for="floatingInput">Height</label>
          </div>
          <div class="form-floating mb-2">
            <input
              value={patient_address}
              onChange={(e) => setPatient_address(e.target.value)}
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label for="floatingInput">Address</label>
          </div>
        </div>

        <button className="registerButton" onClick={changeData}>
          Register
        </button>
        <button onClick={connectMetamask}>Connect to metamask</button>
        <p>
          <br />
          {account}
        </p>
        <button onClick={connectContract}>Connect to Contract</button>
        <br />
        <button onClick={changeData}>Change</button>
        <br />
        <button onClick={getContractData}>Read from contract</button>
        <br />
        {/* <p>{patient_name}</p> */}
      </form>
      {/* <div>
        <h2>Register Patient</h2>
        <form>
          <table>
            <tr>
              <td>Enter Patient Id:</td>
              <td>
                <input type="text" id="id1" name="id1"></input>
              </td>
            </tr>
            <tr>
              <td>Enter Patient name:</td>
              <td>
                <input type="text" id="name1" name="name1"></input>
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input type="text" id="age" name="age"></input>
              </td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>
                <input type="text" id="gen" name="gen"></input>
              </td>
            </tr>
            <tr>
              <td>Height(in ft):</td>
              <td>
                <input type="text" id="hght" name="hght"></input>
              </td>
            </tr>
            <tr>
              <td>Weight(in kg):</td>
              <td>
                <input type="text" id="weig" name="weig"></input>
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>
                <input type="text" id="addr" name="addr"></input>
              </td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>
                <input type="text" id="pno" name="pno"></input>
              </td>
            </tr>
            <tr>
              <td>Email Id:</td>
              <td>
                <input type="text" id="email" name="email"></input>
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <input type="text" id="date" name="date"></input>
              </td>
            </tr>
          </table>
        </form>
        <form>
          <table>
            <tr>
              <td>
                <button>Register</button>
              </td>
            </tr>
          </table>
        </form>
      </div> */}
    </div>
  );
}

export default Patient;

// // import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// // Importing ABI of the contract ............
// import contract from "./Storage.sol/dataStorage.json";

// function App() {
//   const { ethereum } = window; //window is our browser module...........
//   const [address, setAddress] = useState("Connect Wallet");
//   const [balance, setBal] = useState("");
//   const [data, setData] = useState("");

//   const contractAddress = "0x62C06412b57D0FC23cD8E23E55B809954Ee42F98"; //0x5FbDB2315678afecb367f032d93F642f64180aa3

//   //infura RPC url to get Data
//   const infuraProvider = new ethers.providers.JsonRpcProvider(
//     "https://goerli.infura.io/v3/0872104ac1194c049cb83365246a54e5"
//   );

//   //need to provide provider to wallet(metamask) to set data or send transaction......
//   const walletProvider = new ethers.providers.JsonRpcProvider(ethereum);

//   //fetching the data
//   const getStorageData = async () => {
//     const greetings = await getContractData.getData();
//     try {
//       const code = await ethereum.provider.getCode(contractAddress);
//       if (code !== "0x") return true;
//     } catch (error) {
//       console.log("error");
//     }
//     console.log("data is here");
//     // setData(greetings);
//   };

//   //Getting the data from SmartContract Blockchain        (3 parameteres are contractAddress, contract ABI & infuraRPC provider url)
//   const getContractData = new ethers.Contract(
//     contractAddress,
//     contract.abi,
//     infuraProvider
//   );

//   //Sending the data to SmartContract Blockchain     (Similar to getContractData)
//   const sentContractTx = new ethers.Contract(
//     contractAddress,
//     contract.abi,
//     walletProvider
//   );

//   useEffect(() => {
//     window.ethereum.on("accountsChanged", (account) => {
//       setAddress(account[0]);

//       const getBal = async () => {
//         const balance = await ethereum.request({
//           method: "eth_getBalance",
//           params: [account[0], "latest"],
//         });
//         console.log(balance);
//         setBal(ethers.utils.formatEther(balance));
//       };
//       getBal();
//     });
//   });

//   const requestAccount = async () => {
//     // const account = await ethereum.request({
//     //   method: "wallet_requestPermissions",
//     //   params: [{ eth_accounts: {} }],
//     // });

//     const account = await ethereum.request({ method: "eth_requestAccounts" });
//     setAddress(account[0]);

//     const balance = await ethereum.request({
//       method: "eth_getBalance",
//       params: [account[0], "latest"],
//     });
//     setBal(ethers.utils.formatEther(balance));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//           <button onClick={requestAccount}>{address}</button>
//           <button>{balance}</button>
//           <button onClick={getStorageData}>GetData</button>
//           <button>SetData</button>
//           <button>{data}</button>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
