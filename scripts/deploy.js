const hre = require("hardhat");

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

// New Smart Contract ........................

async function main() {
  const Storage = await hre.ethers.getContractFactory("test");
  console.log("Deploying....");
  const storage = await Storage.deploy();
  await storage.deployed();
  console.log("Contract deployed to : ", storage.address);

  // const transacionResponce = await storage.getBookId(1);
  // await transacionResponce.wait(1);
  // const update = await storage.getData(12);
  // console.log(`Updated value is : ${update}`);

  const currentValue = await storage.getData(12);
  console.log(`current value is : ${currentValue}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
