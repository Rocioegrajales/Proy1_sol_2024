import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox";
//deploy
import "hardhat-deploy";
//verify
import "@nomicfoundation/hardhat-verify";

import dotenv from "dotenv";
// import { error } from "console";
dotenv.config();

const { ARBISCAN_API_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY} = 
process.env;

// Validaciones opcionales
if( !ARBISCAN_API_KEY || !ARBITRUM_SEPOLIA_RPC_URL || !WALLET_PRIVATE_KEY) {
  throw new Error("Please set ARBISCAN_API_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY in .env file");
}

const ACCOUNTS: string[] = [WALLET_PRIVATE_KEY];

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const defaultNetwork: string = "hardhat";
const config: HardhatUserConfig = {
  defaultNetwork: defaultNetwork,
    networks: {
    hardhat:{
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
      url: "http://127.0.0.1:8545/",      
    },
    arbitrumSepolia: {
      accounts: ACCOUNTS,
      chainId: 421614, 
      url: ARBITRUM_SEPOLIA_RPC_URL,          
    },
  },
  etherscan:{
    apiKey: {
      arbitrumSepolia: ARBISCAN_API_KEY,
    },
  },
  // namedAccounts: {
  //   deployer: {
  //     default: 0,
  //   },
  // },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.23",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.22",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.21",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.20",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.19",
        settings: SOLC_SETTINGS,
      },
    ],
  },
  mocha: {
    timeout: 200000,
  },
};


// const config: HardhatUserConfig = {
//   solidity: "0.8.24",
// };

export default config;
