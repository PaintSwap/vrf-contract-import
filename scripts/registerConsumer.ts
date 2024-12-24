import {ethers} from "hardhat";
import {SAMWITCH_VRF_ADDRESS} from "./contractAddresses";
import {isBeta} from "./utils";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Registering vrf consumers with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const randomnessBeacon = isBeta
    ? "0x7695be7272f3d223a40fc3c0499053f81c17cb65"
    : "0x9b4ba31bf6031d9304c5d4487c3b30d58cef49a3";

  const instantVRFActions = isBeta
    ? "0x007247ab8fbae2b07f5adf3e70a141459c89264e"
    : "0x1ea4b1fa7f069b89eb8cceee30bfb24945e4d638";

  const lockedBankVault = isBeta
    ? "0x9451943d38ac8cde8a2a8026adb8b28ac089b2cb"
    : "0xfaa31b6ddb7e07cae5ff15475b3966d78d660240";
  const territories = isBeta
    ? "0xa2ca7daad4b86819c455fafc704d727a23c5a513"
    : "0x5a6d80bb035318d2a24c1fdfd055032a15f11b12";

  const pvpBattleground = isBeta ? "" : "";

  const raids = isBeta ? "" : "";

  // TODO: Also add the launchpad contracts
  const launchpad = isBeta
    ? "0x34c217f3cf18b7dd3ecceeb715eca6dd5c5f4450"
    : "0x088e5d8fddee0d4fcdda68cfc1a578d1d8aa37e9";

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
  tx = await swvrf.registerConsumer(launchpad);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
