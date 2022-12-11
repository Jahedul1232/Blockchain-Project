require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      ulr: "2821337f9067987985536499e48b80c48d1c516366991e62b88601349e162700",
      accounts: [
        "https://goerli.infura.io/v3/0872104ac1194c049cb83365246a54e5",
      ],
    },
  },
};
