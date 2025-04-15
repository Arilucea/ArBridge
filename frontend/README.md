# ArBridge Frontend

Frontend application for the ArBridge cross-chain bridge connecting Ethereum Virtual Machine (EVM) and Solana blockchain networks.

## Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # React components
│   ├── services/     # API and service implementations
│   ├── styles/       # CSS and styling
│   └── App.js        # Main application component
└── package.json      # Project dependencies
```

## Features

- Cross-chain asset transfer interface
- Real-time transaction status tracking
- Multiple network support (EVM and Solana)
- User-friendly interface for bridge operations

## Prerequisites

- Node.js (v20 or higher)
- Yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

## Development

### Running the Application

Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`.

### Configuration

The default relayer port is set to `8000`. If your relayer uses a different port, update it in `services/api.js`.

### Building for Production

To create a production build:
```bash
yarn build
```

The build artifacts will be stored in the `build` directory.

## License
GNU License - See [LICENSE](./LICENSE) file for details.