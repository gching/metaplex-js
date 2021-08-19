import { Auction, AuctionState } from '../../../models/programs/auction';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import {
  BidState,
  BidStateType,
} from '../../../models/programs/auction/BidState';
import { PriceFloor, PriceFloorType } from '../../../models/programs/auction';
import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';

export const AUCTIONS = [
  new Auction({
    accountPublicKey: PublicKey.default,
    state: AuctionState.Started,
    authority: PublicKey.default,
    tokenMint: PublicKey.default,
    totalUncancelledBids: new BN(0),
    bidState: new BidState({
      bids: [],
      max: new BN(0),
      type: BidStateType.EnglishAuction,
    }),
    priceFloor: new PriceFloor({
      type: PriceFloorType.BlindedPrice,
    }),
  }),
  new Auction({
    accountPublicKey: PublicKey.default,
    state: AuctionState.Started,
    authority: PublicKey.default,
    tokenMint: PublicKey.default,
    totalUncancelledBids: new BN(0),
    bidState: new BidState({
      bids: [],
      max: new BN(0),
      type: BidStateType.EnglishAuction,
    }),
    priceFloor: new PriceFloor({
      type: PriceFloorType.BlindedPrice,
    }),
  }),
  new Auction({
    accountPublicKey: PublicKey.default,
    state: AuctionState.Started,
    authority: PublicKey.default,
    tokenMint: PublicKey.default,
    totalUncancelledBids: new BN(0),
    bidState: new BidState({
      bids: [],
      max: new BN(0),
      type: BidStateType.EnglishAuction,
    }),
    priceFloor: new PriceFloor({
      type: PriceFloorType.BlindedPrice,
    }),
  }),
];

export const AUCTION_PROGRAMS = generateFixtureAccountDataList(
  Auction.SCHEMA,
  AUCTIONS,
);
