# CosmicAI

CosmicAI is an advanced AI project leveraging blockchain technology for astronomical data analysis. It allows users to upload, analyze, and manage astronomical data securely on the Ethereum blockchain.

## Features

- **Data Upload**: Users can upload astronomical data with a unique identifier and timestamp.
- **Data Analysis**: The contract allows for data analysis through integration with off-chain AI services.
- **Access Control**: Manage user permissions for data access and analysis.
- **Secure Storage**: All data is securely stored on the Ethereum blockchain.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with CosmicAI, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GALACTIC-ASTROPHYSICS-INSTITUTE/GAILab.git
   cd GAILab/CosmicAI
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file based on the `.env.example` provided:
   ```bash
   cp .env.example .env
   ```

4. **Configure your Infura project ID and wallet mnemonic** in the `.env` file.

## Usage

### Deploying Contracts

To deploy the smart contracts, run the following command:

```bash
truffle migrate --network development
```

### Interacting with Contracts

You can interact with the contracts using the provided scripts. For example, to upload data:

```bash
node scripts/fetchData.js
```

### Analyzing Data

To analyze uploaded data, use the following command:

```bash
node scripts/analyzeData.js
```

## Scripts

- **fetchData.js**: Script for uploading astronomical data.
- **analyzeData.js**: Script for analyzing uploaded data.
- **deploy.js**: Script for deploying contracts to the blockchain.

## Testing

To run the tests for the smart contracts, use:

```bash
yarn test
```

This will execute all unit and integration tests defined in the `test` directory.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more information, visit the [CosmicAI GitHub page](https://github.com/GALACTIC-ASTROPHYSICS-INSTITUTE/GAILab/tree/main/CosmicAI).
