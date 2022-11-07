import { ethers } from "ethers";
import { useState } from "react";
import "./patient.css";

function Patient() {
  let [account, setAccount] = useState("");
  let [contractData, setContractData] = useState("");

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
    const Address = "0xD698932D2992aFA8085aE923ef2738c37b7bA587";
    const ABI = [
      {
        inputs: [],
        name: "getData",
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
        inputs: [],
        name: "name",
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
            name: "_name",
            type: "string",
          },
        ],
        name: "setData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);
    console.log(contract.address);
  };

  const getData = async () => {
    const phrase = await contract.getData();
    setContractData(phrase);
  };

  const changeData = async () => {
    const tx = await contract.setData("hi, there");
    const txReciept = await tx.wait();
    console.log(txReciept);
  };

  return (
    <div className="app">
      <button onClick={connectMetamask}>Connect to metamask</button>
      <p>{account}</p>
      <button onClick={connectContract}>Connect to Contract</button>
      <button onClick={changeData}>Change</button>
      <button onClick={getData}>Read from contract</button>
      <p>{contractData}</p>
      <div>
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
      </div>
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
