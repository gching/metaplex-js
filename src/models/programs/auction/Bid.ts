import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { BorshSchema } from '../../utils/types';

export class Bid {
  static SCHEMA: BorshSchema = new Map([
    [
      Bid,
      {
        kind: 'struct',
        fields: [
          ['key', 'pubkey'],
          ['amount', 'u64'],
        ],
      },
    ],
  ]);

  key: PublicKey;
  amount: BN;
  constructor(args: { key: PublicKey; amount: BN }) {
    this.key = args.key;
    this.amount = args.amount;
  }
}
