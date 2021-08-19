import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { BorshSchema } from '../../utils/types';

export class ParticipationState {
  static SCHEMA: BorshSchema = new Map([
    [
      ParticipationState,
      {
        kind: 'struct',
        fields: [
          ['collectedToAcceptPayment', 'u64'],
          ['primarySaleHappened', 'u8'], //bool
          ['validated', 'u8'], //bool
          [
            'printingAuthorizationTokenAccount',
            { kind: 'option', type: 'pubkey' },
          ],
        ],
      },
    ],
  ]);

  collectedToAcceptPayment: BN = new BN(0);
  primarySaleHappened: 0 | 1 = 0;
  validated: 0 | 1 = 0;
  printingAuthorizationTokenAccount?: PublicKey = undefined;

  get isPrimarySaleHappened(): boolean {
    return this.primarySaleHappened === 1;
  }

  get isValidated(): boolean {
    return this.validated === 1;
  }

  constructor(args?: {
    validated?: 0 | 1;
    collectedToAcceptPayment?: BN;
    primarySaleHappened?: 0 | 1;
  }) {
    Object.assign(this, args);
  }
}
