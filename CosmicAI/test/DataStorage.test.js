// test/DataStorage.test.js
const Web3 = require('web3');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Adjust provider as needed
const account = '0xYourAccountAddress'; // Replace with your account address
const privateKey = '0xYourPrivateKey'; // Replace with your private key

const contractABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dataStorageABI.json'), 'utf8'));
const contractAddress = '0xDeployedDataStorageAddress'; // Replace with the deployed contract address

let contract;

before(async () => {
  contract = new web3.eth.Contract(contractABI, contractAddress);
});

describe('Data Storage Contract', () => {
  it('should store data correctly', async () => {
    const dataToStore = 'Sample Data';
    await contract.methods.storeData(dataToStore).send({ from: account });
    const storedData = await contract.methods.retrieveData().call();
    assert.strictEqual(storedData, dataToStore);
  });

  it('should emit an event when data is stored', async () => {
    const eventPromise = new Promise((resolve, reject) => {
      contract.events.DataStored({}, (error, event) => {
        if (error) return reject(error);
        resolve(event);
      });
    });

    const dataToStore = 'Event Data';
    await contract.methods.storeData(dataToStore).send({ from: account });
    const event = await eventPromise;
    assert.strictEqual(event.returnValues.data, dataToStore);
  });
});
