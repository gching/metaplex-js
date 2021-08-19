import { PublicKey } from '@solana/web3.js';
import { BorshSchema } from '../../utils/types';

export class Creator {
  static SCHEMA: BorshSchema = new Map([
    [
      Creator,
      {
        kind: 'struct',
        fields: [
          ['address', 'pubkey'],
          ['verified', 'u8'],
          ['share', 'u8'],
        ],
      },
    ],
  ]);

  address: PublicKey;
  verified: 0 | 1;
  share: number;

  get isVerified(): boolean {
    return this.verified === 1;
  }

  constructor(args: { address: PublicKey; verified: 0 | 1; share: number }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}
