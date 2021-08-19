import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class BidderMetadata {
  static SCHEMA: BorshSchema = new Map([
    [
      BidderMetadata,
      {
        kind: 'struct',
        fields: [
          ['bidderPubkey', 'pubkey'],
          ['auctionPubkey', 'pubkey'],
          ['lastBid', 'u64'],
          ['lastBidTimestamp', 'u64'],
          ['cancelled', 'u8'],
        ],
      },
    ],
  ]);

  accountPublicKey?: PublicKey;
  // Relationship with the bidder who's metadata this covers.
  bidderPubkey: PublicKey;
  // Relationship with the auction this bid was placed on.
  auctionPubkey: PublicKey;
  // Amount that the user bid.
  lastBid: BN;
  // Tracks the last time this user bid.
  lastBidTimestamp: BN;
  // Whether the last bid the user made was cancelled. This should also be enough to know if the
  // user is a winner, as if cancelled it implies previous bids were also cancelled.
  // 0 is false, 1 is true
  cancelled: 0 | 1;

  get isCancelled(): boolean {
    return this.cancelled === 1;
  }

  constructor(args: {
    accountPublicKey?: PublicKey;
    bidderPubkey: PublicKey;
    auctionPubkey: PublicKey;
    lastBid: BN;
    lastBidTimestamp: BN;
    cancelled: 0 | 1;
  }) {
    this.accountPublicKey = args.accountPublicKey;
    this.bidderPubkey = args.bidderPubkey;
    this.auctionPubkey = args.auctionPubkey;
    this.lastBid = args.lastBid;
    this.lastBidTimestamp = args.lastBidTimestamp;
    this.cancelled = args.cancelled;
  }

  static decode(accountWithPubKey: AccountWithPublicKey): BidderMetadata {
    const bidder = deserializeUnchecked(
      BidderMetadata.SCHEMA,
      BidderMetadata,
      accountWithPubKey.account.data,
    ) as BidderMetadata;

    return new BidderMetadata({
      ...bidder,
      accountPublicKey: accountWithPubKey.pubkey,
    });
  }
}
