import { PublicKey } from '@solana/web3.js';
import { MetaplexKey } from './Store';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { AuctionManagerState } from './AuctionManagerState';
import { AuctionManagerSettings } from './AuctionManagerSettings';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class AuctionManager {
  static SCHEMA: BorshSchema = new Map([
    [
      AuctionManager,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['store', 'pubkey'],
          ['authority', 'pubkey'],
          ['auction', 'pubkey'],
          ['vault', 'pubkey'],
          ['acceptPayment', 'pubkey'],
          ['state', AuctionManagerState],
          ['settings', AuctionManagerSettings],
        ],
      },
    ],
    ...AuctionManagerState.SCHEMA,
    ...AuctionManagerSettings.SCHEMA,
  ]);

  key: MetaplexKey = MetaplexKey.AuctionManagerV1;
  accountPublicKey?: PublicKey;
  store: PublicKey;
  authority: PublicKey;
  auction: PublicKey;
  vault: PublicKey;
  acceptPayment: PublicKey;
  state: AuctionManagerState;
  settings: AuctionManagerSettings;

  constructor(args: Omit<AuctionManager, 'key'>) {
    Object.assign(this, args);
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): AuctionManager {
    const auctionManager = deserializeUnchecked(
      AuctionManager.SCHEMA,
      AuctionManager,
      accountWithPublicKey.account.data,
    ) as AuctionManager;

    return new AuctionManager({
      ...auctionManager,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
