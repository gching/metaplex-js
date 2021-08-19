import { BorshSchema } from '../../utils/types';
import { WinningConfigStateItem } from './WinningConfigStateItem';

export class WinningConfigState {
  static SCHEMA: BorshSchema = new Map([
    [
      WinningConfigState,
      {
        kind: 'struct',
        fields: [
          ['items', [WinningConfigStateItem]],
          ['moneyPushedToAcceptPayment', 'u8'], // bool
        ],
      },
    ],
    ...WinningConfigStateItem.SCHEMA,
  ]);

  items: WinningConfigStateItem[] = [];
  moneyPushedToAcceptPayment: 0 | 1 = 0;

  get isMoneyPushedToAcceptPayment(): boolean {
    return this.moneyPushedToAcceptPayment === 1;
  }

  constructor(args?: {
    items?: WinningConfigStateItem[];
    moneyPushedToAcceptPayment?: 0 | 1;
  }) {
    Object.assign(this, args);
  }
}
