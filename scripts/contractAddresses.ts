import {isBeta} from "./utils";

let oracle;
let samWitchVRF;

// Sonic
if (!isBeta) {
  oracle = "0x28ade840602d0363a2ab675479f1b590b23b0490";
  samWitchVRF = "0xE8eE3F1F75Df6807C78adDd1eB3edd010aBEe127";
} else {
  oracle = "0x6f7911cbbd4b5a1d2bdaa817a76056e510d728e7";
  samWitchVRF = "0x1BFf1DC67974577CF62A76463580CA5BBcC5f68e";
}

export const ORACLE_ADDRESS = oracle;
export const SAMWITCH_VRF_ADDRESS = samWitchVRF;
