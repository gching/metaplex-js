import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { Bid } from './Bid';
import { BorshSchema } from '../../utils/types';

export enum BidStateType {
  EnglishAuction = 0,
  OpenEdition = 1,
}

export class BidState {
  static SCHEMA: BorshSchema = new Map([
    [
      BidState,
      {
        kind: 'struct',
        fields: [
          ['type', 'u8'],
          ['bids', [Bid]],
          ['max', 'u64'],
        ],
      },
    ],
    ...Bid.SCHEMA,
  ]);

  type: BidStateType;
  bids: Bid[];
  max: BN;

  public getWinnerAt(winnerIndex: number): PublicKey | null {
    const convertedIndex = this.bids.length - winnerIndex - 1;

    if (convertedIndex >= 0 && convertedIndex < this.bids.length) {
      return this.bids[convertedIndex].key;
    } else {
      return null;
    }
  }

  public getWinnerIndex(bidder: PublicKey): number | null {
    if (!this.bids) return null;

    const index = this.bids.findIndex(
      (b) => b.key.toBase58() === bidder.toBase58(),
    );
    // auction stores data in reverse order
    if (index !== -1) {
      const zeroBased = this.bids.length - index - 1;
      return zeroBased < this.max.toNumber() ? zeroBased : null;
    } else return null;
  }

  constructor(args: { type: BidStateType; bids: Bid[]; max: BN }) {
    this.type = args.type;
    this.bids = args.bids;
    this.max = args.max;
  }
}
