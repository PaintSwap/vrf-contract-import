import {ethers} from "hardhat";
import {SAMWITCH_VRF_ADDRESS} from "./contractAddresses";
import {isBeta} from "./utils";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Registering vrf consumers with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const randomnessBeacon = isBeta ? "0x6a6f13375303a1262602e2de681e465d48d6a11a" : "0xTODO";

  const instantVRFActions = isBeta
    ? "0x8a3255a528f5725088db58a6e65d2385293930e0"
    : "0xfe2c07fd7751bba25164adbd96e09b382403f4d7";

  const lockedBankVault = isBeta
    ? "0xce902bf42864989399e18220d2fee41fe5ac40e4"
    : "0x65e944795d00cc287bdace77d57571fc4deff3e0";
  const territories = isBeta
    ? "0x23eeb2c83878a187a72dfe0f4b2bb511dde35368"
    : "0x2cfd3b9f8b595200d6b4b7f667b2a1bcc6d0c170";

  const pvpBattleground = isBeta ? "" : "";

  const raids = isBeta ? "" : "";

  // TODO: Also add the launchpad contracts
  const launchpad = isBeta ? "0xTODO" : "0xTODO";

  const swvrf = await ethers.getContractAt("SamWitchVRF", SAMWITCH_VRF_ADDRESS);
  let tx = await swvrf.registerConsumer(randomnessBeacon);
  await tx.wait();
  tx = await swvrf.registerConsumer(instantVRFActions);
  await tx.wait();
  tx = await swvrf.registerConsumer(lockedBankVault);
  await tx.wait();
  tx = await swvrf.registerConsumer(territories);
  await tx.wait();
  //  tx = await swvrf.registerConsumer(pvpBattleground);
  //  await tx.wait();
  //  tx = await swvrf.registerConsumer(raids);
  //  await tx.wait();
  //  tx = await swvrf.registerConsumer(launchpad);
  //  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
