import { BorshSchema } from '../../utils/types';
import { WinningConfigState } from './WinningConfigState';
import { ParticipationState } from './ParticipationState';

export enum AuctionManagerStatus {
  Initialized,
  Validated,
  Running,
  Disbursing,
  Finished,
}

export class AuctionManagerState {
  static SCHEMA: BorshSchema = new Map([
    [
      AuctionManagerState,
      {
        kind: 'struct',
        fields: [
          ['status', 'u8'],
          ['winningConfigItemsValidated', 'u8'],
          ['winningConfigStates', [WinningConfigState]],
          ['participationState', { kind: 'option', type: ParticipationState }],
        ],
      },
    ],
    ...WinningConfigState.SCHEMA,
    ...ParticipationState.SCHEMA,
  ]);

  status: AuctionManagerStatus = AuctionManagerStatus.Initialized;
  winningConfigItemsValidated = 0;

  winningConfigStates: WinningConfigState[] = [];

  participationState?: ParticipationState = undefined;

  constructor(args?: AuctionManagerState) {
    Object.assign(this, args);
  }
}
