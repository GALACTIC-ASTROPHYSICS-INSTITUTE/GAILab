// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CosmicAI is Ownable {
    using Strings for uint256;

    // Struct to hold astronomical data
    struct AstronomicalData {
        uint256 id;
        string dataHash; // IPFS hash or similar for data storage
        uint256 timestamp;
        address uploader;
        bool analyzed;
        string analysisResult; // Store the result of the analysis
    }

    // Mapping to store astronomical data
    mapping(uint256 => AstronomicalData) public dataRecords;
    uint256 public dataCount;

    // Event emitted when new data is uploaded
    event DataUploaded(uint256 indexed id, address indexed uploader, string dataHash);

    // Event emitted when data is analyzed
    event DataAnalyzed(uint256 indexed id, string analysisResult);

    // Modifier to check if data is already analyzed
    modifier notAnalyzed(uint256 _id) {
        require(!dataRecords[_id].analyzed, "Data has already been analyzed");
        _;
    }

    // Function to upload astronomical data
    function uploadData(string memory _dataHash) external {
        require(bytes(_dataHash).length > 0, "Data hash cannot be empty");
        
        dataCount++;
        dataRecords[dataCount] = AstronomicalData(dataCount, _dataHash, block.timestamp, msg.sender, false, "");
        emit DataUploaded(dataCount, msg.sender, _dataHash);
    }

    // Function to analyze data (integrated with off-chain AI service)
    function analyzeData(uint256 _id, string memory _analysisResult) external onlyOwner notAnalyzed(_id) {
        require(bytes(_analysisResult).length > 0, "Analysis result cannot be empty");

        // Store the analysis result
        dataRecords[_id].analysisResult = _analysisResult;
        
        // Mark data as analyzed
        dataRecords[_id].analyzed = true;

        emit DataAnalyzed(_id, _analysisResult);
    }

    // Function to retrieve data details
    function getDataDetails(uint256 _id) external view returns (AstronomicalData memory) {
        return dataRecords[_id];
    }

    // Function to withdraw funds (if any) from the contract
    function withdrawFunds(address payable _to) external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        _to.transfer(address(this).balance);
    }

    // Function to get the total number of data records
    function getTotalDataRecords() external view returns (uint256) {
        return dataCount;
    }

    // Fallback function to accept Ether
    receive() external payable {}

    // Function to get the contract balance
    function getContractBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}
