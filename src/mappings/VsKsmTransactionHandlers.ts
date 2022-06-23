import { SubstrateEvent } from "@subql/types";
import { VsKsmTransaction } from "../types";
import { Balance, AccountId } from "@polkadot/types/interfaces";
import { makeSureAccount, sortZenlinkAssetId } from "./utils";

const KSM_ZENLINK_ID = 516;
const VSKSM_ZENLINK_ID = 1028;

// Handing talbe【ZenlinkProtocol】, Event【AssetSwap】
export async function handleZenlinkProtocolAssetSwap(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  const evt = JSON.parse(JSON.stringify(event));
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsKsmTransaction(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );
  const {
    event: {
      data: [address, , tokenList, amounts],
    },
  } = evt;

  const listLength = tokenList.length;

  if (listLength == 2) {
    const assetAmount1 = amounts[0];
    const assetIndex1 = tokenList[0].assetIndex;

    const assetAmount2 = amounts[1];
    const assetIndex2 = tokenList[1].assetIndex;

    let ordered = sortZenlinkAssetId(assetIndex1, assetIndex2);

    let swapAmount = assetAmount2;
    if (ordered) {
      swapAmount = assetAmount1;
    }

    // if it is ksm and vsksm swap pair(ksm orderd before vsksm)
    if (
      (ordered &&
        assetIndex1 == KSM_ZENLINK_ID &&
        assetIndex2 == VSKSM_ZENLINK_ID) ||
      (!ordered &&
        assetIndex2 == KSM_ZENLINK_ID &&
        assetIndex1 == VSKSM_ZENLINK_ID)
    ) {
      const account = (address as AccountId).toString();
      const amount = BigInt((swapAmount as Balance).toString());

      await makeSureAccount(account);
      record.accountId = account;
      record.event = "AssetSwap";
      record.token = "KSM";
      record.amount = amount;
      record.blockHeight = blockNumber;
      record.timestamp = event.block.timestamp;

      await record.save();
    }
  }
}
