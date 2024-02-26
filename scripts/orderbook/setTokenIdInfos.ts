import {ethers} from "hardhat";
import {SAMWITCH_ORDERBOOK_ADDRESS} from "../contractAddresses";
import {SamWitchOrderBook} from "../../typechain-types";
import {allOrderBookTokenIdInfos} from "./data/tokenIdInfos";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(
    `Setting token id infos with the account: ${owner.address} on chain id: ${(await ethers.provider.getNetwork()).chainId}`,
  );

  const samWitchOrderBook = (await ethers.getContractAt(
    "SamWitchOrderBook",
    SAMWITCH_ORDERBOOK_ADDRESS,
  )) as SamWitchOrderBook;
  const chunkSize = 100;
  for (let i = 0; i < allOrderBookTokenIdInfos.length; i += chunkSize) {
    const tokenIds: number[] = [];
    const tokenIdInfos: {tick: bigint; minQuantity: number}[] = [];
    const chunk = allOrderBookTokenIdInfos.slice(i, i + chunkSize);
    chunk.forEach((tokenIdInfo) => {
      tokenIds.push(tokenIdInfo.tokenId);
      tokenIdInfos.push({tick: tokenIdInfo.tick, minQuantity: tokenIdInfo.minQuantity});
    });
    const tx = await samWitchOrderBook.setTokenIdInfos(tokenIds, tokenIdInfos);
    const receipt = await tx.wait();
    console.log("orderBook.setTokenIdInfos");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
