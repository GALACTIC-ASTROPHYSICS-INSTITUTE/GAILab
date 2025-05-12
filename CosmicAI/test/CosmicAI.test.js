// test/CosmicAI.test.js
const Web3 = require('web3');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Adjust provider as needed
const account = '0xYourAccountAddress'; // Replace with your account address
const privateKey = '0xYourPrivateKey'; // Replace with your private key

const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../contractABI.json'), 'utf8'));
const contractAddress = '0xDeployedContractAddress'; // Replace with the deployed contract address

let contract;

before(async () => {
  contract = new web3.eth.Contract(contractABI, contractAddress);
});

describe('Cosmic AI Contract', () => {
  it('should return the correct value from the function', async () => {
    const result = await contract.methods.someFunction().call();
    assert.strictEqual(result, 'ExpectedValue'); // Replace with expected value
  });

  it('should successfully execute a state-changing function', async () => {
    const gasEstimate = await contract.methods.stateChangingFunction().estimateGas({ from: account });
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        gas: gasEstimate,
        data: contract.methods.stateChangingFunction().encodeABI(),
        from: account
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    assert.strictEqual(receipt.status, true);
  });
});
