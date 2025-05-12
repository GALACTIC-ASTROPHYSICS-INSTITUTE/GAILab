// fetchData.js
const Web3 = require('web3');
const contractABI = require('./contractABI.json'); // Replace with your contract's ABI
const contractAddress = '0xYourContractAddress'; // Replace with your contract's address

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Adjust provider as needed
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function fetchData() {
  try {
    const data = await contract.methods.yourMethodName().call(); // Replace with your method name
    console.log('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
