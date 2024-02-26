import hre, {ethers, upgrades} from "hardhat";
import {networkConstants} from "../../constants/network_constants";
import {verifyContracts} from "../utils";
import {SamWitchOrderBook} from "../../typechain-types";
import {isBeta} from "../utils";

// Deploy everything
async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Deploying contracts with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const timeout = 600 * 1000; // 10 minutes

  // Deploy SamWitchOrderBook
  const maxOrdersPerPrice = 100;
  const brush = "0x85dec8c4B2680793661bCA91a8F129607571863d";
  const dev = "0x045eF160107eD663D10c5a31c7D2EC5527eea1D0";
  let estforItems = isBeta
    ? "0x1dae89b469d15b0ded980007dfdc8e68c363203d"
    : "0x4b9c90ebb1fa98d9724db46c4689994b46706f5a";
  if ((await ethers.provider.getNetwork()).chainId == 31337n) {
    const erc1155 = await ethers.deployContract("MockERC1155", []);
    estforItems = await erc1155.getAddress();
  }

  const SamWitchOrderBook = await ethers.getContractFactory("SamWitchOrderBook");
  const devFee = 30; // 0.3%
  const burnFee = 30; // 0.3%
  const swob = (await upgrades.deployProxy(
    SamWitchOrderBook,
    [estforItems, brush, dev, devFee, burnFee, maxOrdersPerPrice],
    {
      kind: "uups",
      timeout,
    },
  )) as unknown as SamWitchOrderBook;
  await swob.waitForDeployment();
  console.log("Deployed SamWitchOrderBook to:", await swob.getAddress());

  const {shouldVerify} = await networkConstants(hre);
  if (shouldVerify) {
    try {
      const addresses: string[] = [await swob.getAddress()];
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
