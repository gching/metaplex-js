import { BorshSchema } from '../../utils/types';
import { WinningConfigItem } from './WinningConfigItem';

export class WinningConfig {
  static SCHEMA: BorshSchema = new Map([
    [
      WinningConfig,
      {
        kind: 'struct',
        fields: [['items', [WinningConfigItem]]],
      },
    ],
    ...WinningConfigItem.SCHEMA,
  ]);

  items: WinningConfigItem[] = [];

  constructor(args?: WinningConfig) {
    Object.assign(this, args);
  }
}
