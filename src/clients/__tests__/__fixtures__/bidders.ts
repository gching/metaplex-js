import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { BidderMetadata } from '../../../models/programs/auction/BidderMetadata';

export const BIDDERS = [
  new BidderMetadata({
    accountPublicKey: PublicKey.default,
    bidderPubkey: PublicKey.default,
    auctionPubkey: PublicKey.default,
    lastBid: new BN(0),
    cancelled: 0,
    lastBidTimestamp: new BN(0),
  }),
  new BidderMetadata({
    accountPublicKey: PublicKey.default,
    bidderPubkey: PublicKey.default,
    auctionPubkey: PublicKey.default,
    lastBid: new BN(0),
    cancelled: 0,
    lastBidTimestamp: new BN(0),
  }),
  new BidderMetadata({
    accountPublicKey: PublicKey.default,
    bidderPubkey: PublicKey.default,
    auctionPubkey: PublicKey.default,
    lastBid: new BN(0),
    cancelled: 0,
    lastBidTimestamp: new BN(0),
  }),
];

export const BIDDER_PROGRAMS = generateFixtureAccountDataList(
  BidderMetadata.SCHEMA,
  BIDDERS,
);
