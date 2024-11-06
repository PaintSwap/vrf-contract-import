import {isBeta} from "./utils";

let oracle;
let samWitchVRF;
let orderbook;

if (!isBeta) {
  oracle = "0x28ade840602d0363a2ab675479f1b590b23b0490";
  samWitchVRF = "0xTODO";
} else {
  oracle = "0x6f7911cbbd4b5a1d2bdaa817a76056e510d728e7";
  samWitchVRF = "0x68db5ba48ad5ca5ee1620a9aee8eec9ccd1cfc95";
}

export const ORACLE_ADDRESS = oracle;
export const SAMWITCH_VRF_ADDRESS = samWitchVRF;
