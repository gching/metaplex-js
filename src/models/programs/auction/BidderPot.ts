import { PublicKey } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class BidderPot {
  static SCHEMA: BorshSchema = new Map([
    [
      BidderPot,
      {
        kind: 'struct',
        fields: [
          ['bidderPot', 'pubkey'],
          ['bidderAct', 'pubkey'],
          ['auctionAct', 'pubkey'],
          ['emptied', 'u8'],
        ],
      },
    ],
  ]);

  accountPublicKey?: PublicKey;
  /// Points at actual pot that is a token account
  bidderPot: PublicKey;
  bidderAct: PublicKey;
  auctionAct: PublicKey;
  emptied: 0 | 1;

  get isEmptied(): boolean {
    return this.emptied === 1;
  }
  constructor(args: Omit<BidderPot, 'isEmptied'>) {
    Object.assign(this, args);
  }

  static decode(accountWithPubKey: AccountWithPublicKey): BidderPot {
    const bidderPot = deserializeUnchecked(
      BidderPot.SCHEMA,
      BidderPot,
      accountWithPubKey.account.data,
    ) as BidderPot;

    return new BidderPot({
      ...bidderPot,
      accountPublicKey: accountWithPubKey.pubkey,
    });
  }
}
