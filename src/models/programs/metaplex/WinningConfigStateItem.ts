import { BorshSchema } from '../../utils/types';

export class WinningConfigStateItem {
  static SCHEMA: BorshSchema = new Map([
    [
      WinningConfigStateItem,
      {
        kind: 'struct',
        fields: [
          ['primarySaleHappened', 'u8'], //bool
          ['claimed', 'u8'], // bool
        ],
      },
    ],
  ]);

  primarySaleHappened: 0 | 1 = 0;
  claimed: 0 | 1 = 0;

  get isPrimarySaleHappened(): boolean {
    return this.primarySaleHappened === 1;
  }

  get isClaimed(): boolean {
    return this.claimed === 1;
  }

  constructor(args?: { primarySaleHappened?: 0 | 1; claimed?: 0 | 1 }) {
    Object.assign(this, args);
  }
}
