import {ethers, upgrades} from "hardhat";
import {SamWitchOrderBook} from "../../typechain-types";

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`ChainId: ${network.chainId}`);

  const owner = await ethers.getImpersonatedSigner("0x316342122A9ae36de41B231260579b92F4C8Be7f");
  const user = await ethers.getImpersonatedSigner("0x8CA12Fb5438252ab8efa25d3fb34166EDA1c17ED");
  const timeout = 600 * 1000; // 10 minutes

  const SamWitchOrderBook = (await ethers.getContractFactory("SamWitchOrderBook")).connect(owner);
  const swob = (await upgrades.upgradeProxy("0x082480aAAF1ac5bb0Db2c241eF8b4230Da85E191", SamWitchOrderBook, {
    kind: "uups",
    timeout,
  })) as unknown as SamWitchOrderBook;
  await swob.waitForDeployment();

  await swob.connect(user).limitOrders([
    {side: 0, tokenId: 1, price: 20000000000000, quantity: 1},
    {side: 0, tokenId: 2, price: 30000000000000, quantity: 1},
    {side: 0, tokenId: 3, price: 40000000000000, quantity: 1},
    {side: 0, tokenId: 4, price: 50000000000000, quantity: 1},
    {side: 0, tokenId: 5, price: 60000000000000, quantity: 1},
    {side: 0, tokenId: 6, price: 70000000000000, quantity: 1},
    {side: 0, tokenId: 7, price: 80000000000000, quantity: 1},
    {side: 0, tokenId: 513, price: 90000000000000, quantity: 1},
    {side: 0, tokenId: 514, price: 100000000000000, quantity: 1},
    {side: 0, tokenId: 515, price: 110000000000000, quantity: 1},
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
