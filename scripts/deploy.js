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
  const Storage = await hre.ethers.getContractFactory("Course");
  console.log("Deploying....");
  const storage = await Storage.deploy();
  await storage.deployed();
  console.log("Contract deployed to : ", storage.address);

  const currentValue = await storage.getInstructorInfos(1);
  console.log(`current value is : ${currentValue}`);

  //update the current value
  const transacionResponce = await storage.setInstructor(2, 27, "hello", "Md");
  await transacionResponce.wait(1);
  const update = await storage.getInstructorInfos(2);
  console.log(`Updated value is : ${update}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
