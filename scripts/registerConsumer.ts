import {ethers} from "hardhat";
import {SAMWITCH_VRF_ADDRESS} from "./contractAddresses";
import {isBeta} from "./utils";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Registering vrf consumers with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const world = isBeta ? "0x01b7e0b11c8592bf82e17b0983c2b63b1d6903f7" : "0xTODO";

  const lockedBankVault = isBeta
    ? "0xa40cdc60a5940a566a604def0cba8b314fca0812"
    : "0x65e944795d00cc287bdace77d57571fc4deff3e0";
  const territories = isBeta
    ? "0xb30ce815afdf218759a1de5c09fa0d72bb54f5b2"
    : "0x2cfd3b9f8b595200d6b4b7f667b2a1bcc6d0c170";

  const instantVRFActions = isBeta
    ? "0xba144ddba43d8f5566da9debc0479d6da0774754"
    : "0xfe2c07fd7751bba25164adbd96e09b382403f4d7";

  // TODO: Also add the launchpad contracts
  const launchpad = isBeta ? "0xTODO" : "0xTODO";

  const swvrf = await ethers.getContractAt("SamWitchVRF", SAMWITCH_VRF_ADDRESS);
  let tx = await swvrf.registerConsumer(world);
  await tx.wait();
  tx = await swvrf.registerConsumer(lockedBankVault);
  await tx.wait();
  tx = await swvrf.registerConsumer(territories);
  await tx.wait();
  tx = await swvrf.registerConsumer(instantVRFActions);
  await tx.wait();
  //  tx = await swvrf.registerConsumer(launchpad);
  //  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
