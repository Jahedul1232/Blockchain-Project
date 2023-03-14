// const hre = require("hardhat");

// async function main() {
//   const Storage = await hre.ethers.getContractFactory("dataStorage");
//   console.log("Deploying....");
//   const storage = await Storage.deploy();
//   await storage.deployed();
//   console.log("Contract deployed to : ", storage.address);
//   const currentValue = await storage.getData();
//   console.log(`current value is : ${currentValue}`);

// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
//
//
//
//
//

// New Smart Contract deployment for Patient.sol smartContract ........................

const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const con = await hre.ethers.getContractFactory("Storage");
  // const Token = await ethers.getContractFactory("Token");
  // const hardhatToken = await Token.deploy();
  // const ownerBalance = await hardhatToken.balanceOf(owner.address);
  // console.log("balance is ", ownerBalance);

  console.log("Deploying....");
  const storage = await con.deploy();
  await storage.deployed();
  console.log("Contract deployed to : ", storage.address);

  // const currentValue = await storage.get(0);
  // console.log(`current value is : ${currentValue}`);

  //update the current value
  const transacionResponce = await storage.store("5");
  await transacionResponce.wait(1);
  console.log("data stored");
  const update = await storage.retrieve();
  console.log(`Updated value is : ${update}`);

  //  ------------> The real One <---------------!
  // const Storage = await hre.ethers.getContractFactory("Todos");
  // console.log("Deploying....");
  // const storage = await Storage.deploy();
  // await storage.deployed();
  // console.log("Contract deployed to : ", storage.address);

  // // const currentValue = await storage.get(0);
  // // console.log(`current value is : ${currentValue}`);

  // //update the current value
  // const transacionResponce = await storage.create(
  //   "jahedul",
  //   "north carolin",
  //   25,
  //   "M",
  //   5
  // );
  // await transacionResponce.wait(1);
  // console.log("data stored");
  // const update = await storage.get(0);
  // console.log(`Updated value is : ${update}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
