import BN from 'bn.js';
import { BorshSchema } from '../../utils/types';

export enum WinningConstraint {
  NoParticipationPrize = 0,
  ParticipationPrizeGiven = 1,
}

export enum NonWinningConstraint {
  NoParticipationPrize = 0,
  GivenForFixedPrice = 1,
  GivenForBidPrice = 2,
}

export class ParticipationConfig {
  static SCHEMA: BorshSchema = new Map([
    [
      ParticipationConfig,
      {
        kind: 'struct',
        fields: [
          ['winnerConstraint', 'u8'], // enum
          ['nonWinningConstraint', 'u8'],
          ['safetyDepositBoxIndex', 'u8'],
          ['fixedPrice', { kind: 'option', type: 'u64' }],
        ],
      },
    ],
  ]);

  winnerConstraint: WinningConstraint = WinningConstraint.NoParticipationPrize;
  nonWinningConstraint: NonWinningConstraint =
    NonWinningConstraint.GivenForFixedPrice;
  safetyDepositBoxIndex = 0;
  fixedPrice: BN | undefined = new BN(0);

  constructor(args?: ParticipationConfig) {
    Object.assign(this, args);
  }
}
