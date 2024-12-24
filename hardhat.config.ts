import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-storage-layout";
import "solidity-coverage";
import {SolcUserConfig} from "hardhat/types";
import "dotenv/config";

const defaultConfig: SolcUserConfig = {
  version: "0.8.28",
  settings: {
    evmVersion: "paris",
    optimizer: {
      enabled: true,
      runs: 9999999,
      details: {
        yul: true,
      },
    },
    viaIR: process.env.HARDHAT_VIAIR != "false",
    outputSelection: {
      "*": {
        "*": ["storageLayout"],
      },
    },
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [defaultConfig],
  },
  gasReporter: {
    enabled: process.env.GAS_REPORTER != "false",
    currency: process.env.GAS_CURRENCY || "USD",
    token: process.env.GAS_TOKEN || "FTM",
    maxMethodDiff: 1,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPriceApi: "https://api.ftmscan.com/api?module=proxy&action=eth_gasPrice",
    excludeContracts: ["contracts/test/"],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      allowUnlimitedContractSize: true,
    },
    sonic: {
      url: process.env.SONIC_RPC,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    "sonic-blaze": {
      url: process.env.SONIC_BLAZE_RPC,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
      fantom: process.env.ETHERSCAN_API_KEY as string,
      sonic: process.env.SONICSCAN_API_KEY as string,
    },
    customChains: [
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org",
        },
      },
    ],
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    flat: false,
  },
};

export default config;
