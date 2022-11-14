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

async function main() {
  const Storage = await hre.ethers.getContractFactory("Todos");
  console.log("Deploying....");
  const storage = await Storage.deploy();
  await storage.deployed();
  console.log("Contract deployed to : ", storage.address);

  // const currentValue = await storage.get(0);
  // console.log(`current value is : ${currentValue}`);

  //update the current value
  const transacionResponce = await storage.create(
    "jahedul",
    "north carolin",
    25,
    "M",
    5
  );
  await transacionResponce.wait(1);
  console.log("data stored");
  const update = await storage.get(0);
  console.log(`Updated value is : ${update}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
