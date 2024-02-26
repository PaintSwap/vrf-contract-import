import {isBeta} from "./utils";

let oracle;
let samWitchVRF;
let orderbook;

if (!isBeta) {
  oracle = "0x28ade840602d0363a2ab675479f1b590b23b0490";
  samWitchVRF = "0xeF5AC0489fc8ABC1085E8D1f5BEE85e74E6D2cC2";
  orderbook = "0x6996c519dA4ac7815bEFbd836cf0b78Aa62fdBcE";
} else {
  oracle = "0x6f7911cbbd4b5a1d2bdaa817a76056e510d728e7";
  samWitchVRF = "0x58E9fd2Fae18c861B9F564200510A88106C05756";
  orderbook = "0x082480aAAF1ac5bb0Db2c241eF8b4230Da85E191";
}

export const ORACLE_ADDRESS = oracle;
export const SAMWITCH_VRF_ADDRESS = samWitchVRF;
export const SAMWITCH_ORDERBOOK_ADDRESS = orderbook;
