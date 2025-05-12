// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CosmicAI is Ownable {
    // Struct to hold astronomical data
    struct AstronomicalData {
        uint256 id;
        string dataHash; // IPFS hash or similar for data storage
        uint256 timestamp;
        address uploader;
        bool analyzed;
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
        dataCount++;
        dataRecords[dataCount] = AstronomicalData(dataCount, _dataHash, block.timestamp, msg.sender, false);
        emit DataUploaded(dataCount, msg.sender, _dataHash);
    }

    // Function to analyze data (mockup for AI analysis)
    function analyzeData(uint256 _id) external onlyOwner notAnalyzed(_id) {
        // Here you would integrate with an off-chain AI service to analyze the data
        // For demonstration, we will just return a mock result
        string memory analysisResult = "Analysis complete for data ID: ";
        
        // Mark data as analyzed
        dataRecords[_id].analyzed = true;

        emit DataAnalyzed(_id, analysisResult);
    }

    // Function to retrieve data details
    function getDataDetails(uint256 _id) external view returns (AstronomicalData memory) {
        return dataRecords[_id];
    }

    // Function to withdraw funds (if any) from the contract
    function withdrawFunds(address payable _to) external onlyOwner {
        _to.transfer(address(this).balance);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
