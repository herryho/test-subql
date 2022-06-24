import { makeSureAccount, getPricision } from "./utils";
import { SubstrateEvent } from "@subql/types";
import { Balance, AccountId } from "@polkadot/types/interfaces";
import { VsBondMarket } from "../types";
import { BigNumber } from "bignumber.js";

/// VstokenConversion module

// Handing talbe【VstokenConversion】, Event【VsbondConvertToVsksm】
export async function handleVstokenConversionVsbondConvertToVsksm(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );
  const {
    event: {
      data: [address, , , vstokenAmount],
    },
  } = event;

  const account = (address as AccountId).toString();
  const amount = BigInt((vstokenAmount as Balance).toString());

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "VsbondConvertToVsksm";
  record.token = "VSKSM";
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}

// Handing talbe【VstokenConversion】, Event【VsksmConvertToVsbond】
export async function handleVstokenConversionVsksmConvertToVsbond(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );
  const {
    event: {
      data: [address, , , vstokenAmount],
    },
  } = event;

  const account = (address as AccountId).toString();
  const amount = BigInt((vstokenAmount as Balance).toString());

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "VsksmConvertToVsbond";
  record.token = "VSKSM";
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}

// Handing talbe【VstokenConversion】, Event【VsbondConvertToVsdot】
export async function handleVstokenConversionVsbondConvertToVsdot(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );
  const {
    event: {
      data: [address, , , vstokenAmount],
    },
  } = event;

  const account = (address as AccountId).toString();
  const amount = BigInt((vstokenAmount as Balance).toString());

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "VsbondConvertToVsdot";
  record.token = "VSDOT";
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}

// Handing talbe【VstokenConversion】, Event【VsdotConvertToVsbond】
export async function handleVstokenConversionVsdotConvertToVsbond(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );
  const {
    event: {
      data: [address, , , vstokenAmount],
    },
  } = event;

  const account = (address as AccountId).toString();
  const amount = BigInt((vstokenAmount as Balance).toString());

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "VsdotConvertToVsbond";
  record.token = "VSDOT";
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}

/// VsbondAuction module

// Handing talbe【VsbondAuction】, Event【OrderCreated】
export async function handleVsbondAuctionOrderCreated(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );

  let evt = JSON.parse(JSON.stringify(event));

  const {
    event: {
      data: [, , address, { vsBond: tokenInfo }, , price],
    },
  } = evt;

  const tokenName = tokenInfo[0];
  const account = (address as AccountId).toString();
  const amount = BigInt((price as Balance).toString());

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "OrderCreated";
  record.token = tokenName;
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}

// Handing talbe【VsbondAuction】, Event【OrderRevoked】
export async function handleVsbondAuctionOrderRevoked(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );

  let evt = JSON.parse(JSON.stringify(event));

  const {
    event: {
      data: [, , address, { vsBond: tokenInfo }, , , price],
    },
  } = evt;

  const account = (address as AccountId).toString();
  const amount = BigInt((price as Balance).toString());
  const tokenName = tokenInfo[0];

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "OrderRevoked";
  record.token = tokenName;
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}

// Handing talbe【VsbondAuction】, Event【OrderClinchd】
export async function handleVsbondAuctionOrderClinchd(
  event: SubstrateEvent
): Promise<void> {
  //   logger.info(`${event}`);
  const blockNumber = event.block.block.header.number.toNumber();
  //Create the record by constructing id from blockNumber + eventIndex
  const record = new VsBondMarket(
    `${blockNumber.toString()}-${event.idx.toString()}`
  );

  let evt = JSON.parse(JSON.stringify(event));

  const {
    event: {
      data: [, , address, , { vsBond: tokenInfo }, , , , price],
    },
  } = evt;

  const account = (address as AccountId).toString();
  const amount = BigInt((price as Balance).toString());
  const tokenName = tokenInfo[0];

  await makeSureAccount(account);

  record.accountId = account;
  record.event = "OrderClinchd";
  record.token = tokenName;
  record.amount = amount;
  record.blockHeight = blockNumber;
  record.timestamp = event.block.timestamp;

  await record.save();
}
