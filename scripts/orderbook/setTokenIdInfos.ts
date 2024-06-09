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
    EstforConstants.RING_1,
    EstforConstants.RING_2,
    EstforConstants.RING_3,
    EstforConstants.RING_4,
    EstforConstants.RING_5,
    EstforConstants.RING_6,
    EstforConstants.INFUSED_ORICHALCUM_HELMET_FRAGMENT,
    EstforConstants.INFUSED_ORICHALCUM_ARMOR_FRAGMENT,
    EstforConstants.INFUSED_ORICHALCUM_TASSETS_FRAGMENT,
    EstforConstants.INFUSED_ORICHALCUM_GAUNTLETS_FRAGMENT,
    EstforConstants.INFUSED_ORICHALCUM_BOOTS_FRAGMENT,
    EstforConstants.INFUSED_ORICHALCUM_SHIELD_FRAGMENT,
    EstforConstants.INFUSED_DRAGONSTONE_AMULET_FRAGMENT,
    EstforConstants.INFUSED_MASTER_HAT_FRAGMENT,
    EstforConstants.INFUSED_MASTER_BODY_FRAGMENT,
    EstforConstants.INFUSED_MASTER_BRACERS_FRAGMENT,
    EstforConstants.INFUSED_MASTER_TROUSERS_FRAGMENT,
    EstforConstants.INFUSED_MASTER_BOOTS_FRAGMENT,
    EstforConstants.INFUSED_ORICHALCUM_SWORD_FRAGMENT,
    EstforConstants.DRAGONSTONE_STAFF_FRAGMENT,
    EstforConstants.GODLY_BOW_FRAGMENT,
    EstforConstants.INFUSED_SCORCHING_COWL_FRAGMENT,
    EstforConstants.INFUSED_SCORCHING_BODY_FRAGMENT,
    EstforConstants.INFUSED_SCORCHING_BRACERS_FRAGMENT,
    EstforConstants.INFUSED_SCORCHING_CHAPS_FRAGMENT,
    EstforConstants.INFUSED_SCORCHING_BOOTS_FRAGMENT,
    EstforConstants.FISHING_CHEST_1,
    EstforConstants.FISHING_CHEST_2,
    EstforConstants.FISHING_CHEST_3,
    EstforConstants.FISHING_CHEST_4,
    EstforConstants.FISHING_CHEST_5,
    EstforConstants.WOODCUTTING_CHEST_1,
    EstforConstants.WOODCUTTING_CHEST_2,
    EstforConstants.WOODCUTTING_CHEST_3,
    EstforConstants.WOODCUTTING_CHEST_4,
    EstforConstants.WOODCUTTING_CHEST_5,
    EstforConstants.MINING_CHEST_1,
    EstforConstants.MINING_CHEST_2,
    EstforConstants.MINING_CHEST_3,
    EstforConstants.MINING_CHEST_4,
    EstforConstants.MINING_CHEST_5,
    EstforConstants.DRAGON_CHEST,
    EstforConstants.BONE_CHEST,
    EstforConstants.BRIMSTONE,
    EstforConstants.COIN,
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
