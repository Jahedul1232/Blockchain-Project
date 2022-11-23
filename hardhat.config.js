require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      ulr: ALCHEMY_GOERLI_URL,
      accounts: [process.env.GOERLI_WALLET_PRIVATE_KEY],
    },
  },
};
