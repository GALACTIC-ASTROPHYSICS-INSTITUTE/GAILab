// deploy.js
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Adjust provider as needed
const account = '0xYourAccountAddress'; // Replace with your account address
const privateKey = '0xYourPrivateKey'; // Replace with your private key

const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'contractABI.json'), 'utf8')); // Replace with your contract's ABI
const contractBytecode = fs.readFileSync(path.resolve(__dirname, 'contractBytecode.bin'), 'utf8'); // Replace with your contract's bytecode

async function deployContract() {
  const contract = new web3.eth.Contract(contractABI);
  
  const deployTx = contract.deploy({
    data: contractBytecode,
    arguments: [] // Add constructor arguments if needed
  });

  const gasEstimate = await deployTx.estimateGas();
  const gasPrice = await web3.eth.getGasPrice();

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      data: deployTx.encodeABI(),
      gas: gasEstimate,
      gasPrice: gasPrice,
      from: account
    },
    privateKey
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('Contract deployed at address:', receipt.contractAddress);
}

deployContract().catch(console.error);
