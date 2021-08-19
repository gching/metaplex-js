import { BorshSchema } from '../../utils/types';
import { WinningConfig } from './WinningConfig';
import { ParticipationConfig } from './ParticipationConfig';

export class AuctionManagerSettings {
  static SCHEMA: BorshSchema = new Map([
    [
      AuctionManagerSettings,
      {
        kind: 'struct',
        fields: [
          ['winningConfigs', [WinningConfig]],
          [
            'participationConfig',
            { kind: 'option', type: ParticipationConfig },
          ],
        ],
      },
    ],
    ...WinningConfig.SCHEMA,
    ...ParticipationConfig.SCHEMA,
  ]);

  winningConfigs: WinningConfig[] = [];
  participationConfig?: ParticipationConfig = undefined;

  constructor(args?: AuctionManagerSettings) {
    Object.assign(this, args);
  }
}
