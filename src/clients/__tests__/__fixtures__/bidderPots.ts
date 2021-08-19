import { PublicKey } from '@solana/web3.js';
import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { BidderPot } from '../../../models/programs/auction';

export const BIDDER_POTS = [
  new BidderPot({
    accountPublicKey: PublicKey.default,
    bidderPot: PublicKey.default,
    bidderAct: PublicKey.default,
    auctionAct: PublicKey.default,
    emptied: 0,
  }),
  new BidderPot({
    accountPublicKey: PublicKey.default,
    bidderPot: PublicKey.default,
    bidderAct: PublicKey.default,
    auctionAct: PublicKey.default,
    emptied: 0,
  }),
  new BidderPot({
    accountPublicKey: PublicKey.default,
    bidderPot: PublicKey.default,
    bidderAct: PublicKey.default,
    auctionAct: PublicKey.default,
    emptied: 0,
  }),
];

export const BIDDER_POT_PROGRAMS = generateFixtureAccountDataList(
  BidderPot.SCHEMA,
  BIDDER_POTS,
);
