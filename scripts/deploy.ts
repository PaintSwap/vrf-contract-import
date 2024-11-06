import hre, {ethers, upgrades} from "hardhat";
import {ORACLE_ADDRESS} from "./contractAddresses";
import {networkConstants} from "../constants/network_constants";
import {SamWitchVRF} from "../typechain-types";
import {verifyContracts} from "./utils";

// Deploy everything
async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Deploying contracts with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const timeout = 600 * 1000; // 10 minutes

  // Deploy SamWitchVRF
  const SamWitchVRF = await ethers.getContractFactory("SamWitchVRF");
  const swvrf = (await upgrades.deployProxy(SamWitchVRF, [ORACLE_ADDRESS], {
    kind: "uups",
    timeout,
  })) as unknown as SamWitchVRF;
  await swvrf.waitForDeployment();
  console.log("Deployed SamWitchVRF to:", await swvrf.getAddress());

  const {shouldVerify} = await networkConstants(hre);
  if (shouldVerify) {
    try {
      const addresses: string[] = [await swvrf.getAddress()];
      console.log("Verifying contracts...");
      await verifyContracts(addresses);
    } catch (e) {
      console.log(e);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
