import {ethers} from "hardhat";
import {SAMWITCH_ORDERBOOK_ADDRESS} from "../contractAddresses";
import {SamWitchOrderBook} from "../../typechain-types";
import {allOrderBookTokenIdInfos} from "./data/tokenIdInfos";
import {EstforConstants} from "@paintswap/estfor-definitions";

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

  const newTokenIds = new Set([
    EstforConstants.EGG_TIER1,
    EstforConstants.EGG_TIER2,
    EstforConstants.EGG_TIER3,
    EstforConstants.EGG_TIER4,
    EstforConstants.EGG_TIER5,
    EstforConstants.SECRET_EGG_1_TIER2,
    EstforConstants.SECRET_EGG_1_TIER3,
    EstforConstants.SECRET_EGG_1_TIER4,
    EstforConstants.SECRET_EGG_1_TIER5,
    EstforConstants.SECRET_EGG_2_TIER2,
    EstforConstants.SECRET_EGG_2_TIER3,
    EstforConstants.SECRET_EGG_2_TIER4,
    EstforConstants.SECRET_EGG_2_TIER5,
    EstforConstants.SECRET_EGG_3_TIER2,
    EstforConstants.SECRET_EGG_3_TIER3,
    EstforConstants.SECRET_EGG_3_TIER4,
    EstforConstants.SECRET_EGG_3_TIER5,
    EstforConstants.SECRET_EGG_4_TIER2,
    EstforConstants.SECRET_EGG_4_TIER3,
    EstforConstants.SECRET_EGG_4_TIER4,
    EstforConstants.SECRET_EGG_4_TIER5,
  ]);

  const orderBookTokenIdInfos = allOrderBookTokenIdInfos.filter((tokenIdInfo) => newTokenIds.has(tokenIdInfo.tokenId));

  for (let i = 0; i < orderBookTokenIdInfos.length; i += chunkSize) {
    const tokenIds: number[] = [];
    const tokenIdInfos: {tick: string; minQuantity: string}[] = [];
    const chunk = orderBookTokenIdInfos.slice(i, i + chunkSize);
    chunk.forEach((tokenIdInfo) => {
      tokenIds.push(tokenIdInfo.tokenId);
      tokenIdInfos.push({tick: tokenIdInfo.tick, minQuantity: tokenIdInfo.minQuantity});
    });
    const tx = await samWitchOrderBook.setTokenIdInfos(tokenIds, tokenIdInfos);
    await tx.wait();
    console.log("orderBook.setTokenIdInfos");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
