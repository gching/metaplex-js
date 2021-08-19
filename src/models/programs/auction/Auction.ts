import { deserializeUnchecked } from 'borsh';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { BorshSchema } from '../../utils/types';
import { PriceFloor } from './PriceFloor';
import { BidState } from './BidState';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export enum AuctionState {
  Created = 0,
  Started,
  Ended,
}

export class Auction {
  static SCHEMA: BorshSchema = new Map([
    [
      Auction,
      {
        kind: 'struct',
        fields: [
          ['authority', 'pubkey'],
          ['tokenMint', 'pubkey'],
          ['lastBid', { kind: 'option', type: 'u64' }],
          ['endedAt', { kind: 'option', type: 'u64' }],
          ['endAuctionAt', { kind: 'option', type: 'u64' }],
          ['auctionGap', { kind: 'option', type: 'u64' }],
          ['priceFloor', PriceFloor],
          ['state', 'u8'],
          ['bidState', BidState],
          ['totalUncancelledBids', { kind: 'option', type: 'u64' }],
        ],
      },
    ],
    ...PriceFloor.SCHEMA,
    ...BidState.SCHEMA,
  ]);

  accountPublicKey?: PublicKey;
  /// Pubkey of the authority with permission to modify this auction.
  authority: PublicKey;
  /// Token mint for the SPL token being used to bid
  tokenMint: PublicKey;
  /// The time the last bid was placed, used to keep track of auction timing.
  lastBid: BN | undefined;
  /// Slot time the auction was officially ended by.
  endedAt: BN | undefined;
  /// End time is the cut-off point that the auction is forced to end by.
  endAuctionAt: BN | undefined;
  /// Gap time is the amount of time in slots after the previous bid at which the auction ends.
  auctionGap: BN | undefined;
  /// Minimum price for any bid to meet.
  priceFloor: PriceFloor;
  /// The state the auction is in, whether it has started or ended.
  state: AuctionState;
  /// Auction Bids, each user may have one bid open at a time.
  bidState: BidState;
  /// Total uncancelled bids
  totalUncancelledBids: BN;
  /// Used for precalculation on the front end, not a backend key
  bidRedemptionKey?: PublicKey;

  constructor(args: {
    accountPublicKey?: PublicKey;
    authority: PublicKey;
    tokenMint: PublicKey;
    lastBid?: BN;
    endedAt?: BN;
    endAuctionAt?: BN;
    auctionGap?: BN;
    priceFloor: PriceFloor;
    state: AuctionState;
    bidState: BidState;
    totalUncancelledBids: BN;
  }) {
    this.accountPublicKey = args.accountPublicKey;
    this.authority = args.authority;
    this.tokenMint = args.tokenMint;
    this.lastBid = args.lastBid;
    this.endedAt = args.endedAt;
    this.endAuctionAt = args.endAuctionAt;
    this.auctionGap = args.auctionGap;
    this.priceFloor = args.priceFloor;
    this.state = args.state;
    this.bidState = args.bidState;
    this.totalUncancelledBids = args.totalUncancelledBids;
  }

  static decode(accountWithPubKey: AccountWithPublicKey): Auction {
    const auction = deserializeUnchecked(
      Auction.SCHEMA,
      Auction,
      accountWithPubKey.account.data,
    ) as Auction;

    return new Auction({
      ...auction,
      accountPublicKey: accountWithPubKey.pubkey,
    });
  }
}
