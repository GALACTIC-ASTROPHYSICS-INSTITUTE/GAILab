const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const infuraKey = "YOUR_INFURA_PROJECT_ID"; // Replace with your Infura project ID
const mnemonic = "YOUR_MNEMONIC"; // Replace with your wallet mnemonic

module.exports = {
  // Specify the Solidity compiler version
  compilers: {
    solc: {
      version: "0.8.0", // Specify the version of Solidity you want to use
    }
  },
  
  // Configure networks
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Ganache port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out (minimum/default: 50)
      skipDryRun: true // Skip dry run before migrations? (default: false for public nets)
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`),
      network_id: 1, // Mainnet's id
      gas: 5500000, // Mainnet has a lower block limit than mainnet
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Configure the migrations directory
  migrations_directory: "./migrations",

  // Configure the build directory
  contracts_build_directory: "./build/contracts",

  // Configure the test directory
  test_directory: "./test",

  // Configure the Truffle console
  console: {
    // Add any console options here
  }
};
