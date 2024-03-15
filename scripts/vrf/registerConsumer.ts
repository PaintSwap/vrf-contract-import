import {ethers} from "hardhat";
import {SAMWITCH_VRF_ADDRESS} from "../contractAddresses";
import {isBeta} from "../utils";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Registering vrf consumers with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const lockedBankVault = isBeta
    ? "0x40567ad9cd25c56422807ed67f0e66f1825bdb91"
    : "0x65e944795d00cc287bdace77d57571fc4deff3e0";
  const territories = isBeta
    ? "0xf31517db9f0987002f3a0fb4f787dfb9e892f184"
    : "0x2cfd3b9f8b595200d6b4b7f667b2a1bcc6d0c170";

  const instantVRFActions = isBeta ? "0xbde211941ef875c1d90e304ae4a4bc6cbd1463dc" : "TODO";

  const swvrf = await ethers.getContractAt("SamWitchVRF", SAMWITCH_VRF_ADDRESS);
  let tx = await swvrf.registerConsumer(lockedBankVault);
  await tx.wait();
  tx = await swvrf.registerConsumer(territories);
  await tx.wait();
  tx = await swvrf.registerConsumer(instantVRFActions);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
