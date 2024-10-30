import {ethers, upgrades} from "hardhat";
import {SamWitchOrderBook} from "../../typechain-types";

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`ChainId: ${network.chainId}`);

  const owner = await ethers.getImpersonatedSigner("0x316342122A9ae36de41B231260579b92F4C8Be7f");
  const user = await ethers.getImpersonatedSigner("0x401C05501DB6FED376563c1bA3FE61c322Fb77a4");
  const timeout = 600 * 1000; // 10 minutes

  const SamWitchOrderBook = (await ethers.getContractFactory("SamWitchOrderBook")).connect(owner);
  const swob = (await upgrades.upgradeProxy("0x6996c519dA4ac7815bEFbd836cf0b78Aa62fdBcE", SamWitchOrderBook, {
    kind: "uups",
    timeout,
  })) as unknown as SamWitchOrderBook;
  await swob.waitForDeployment();

  await swob.connect(user).cancelOrders([6342], [{side: 0, tokenId: 12544, price: "1700000000000000000000"}]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
