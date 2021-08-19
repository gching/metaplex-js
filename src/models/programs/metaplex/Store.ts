import { PublicKey } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export enum MetaplexKey {
  Uninitialized = 0,
  OriginalAuthorityLookupV1 = 1,
  BidRedemptionTicketV1 = 2,
  StoreV1 = 3,
  WhitelistedCreatorV1 = 4,
  PayoutTicketV1 = 5,
  SafetyDepositValidationTicketV1 = 6,
  AuctionManagerV1 = 7,
  PrizeTrackingTicketV1 = 8,
}

export class Store {
  static SCHEMA: BorshSchema = new Map([
    [
      Store,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['public', 'u8'],
          ['auctionProgram', 'pubkey'],
          ['tokenVaultProgram', 'pubkey'],
          ['tokenMetadataProgram', 'pubkey'],
          ['tokenProgram', 'pubkey'],
        ],
      },
    ],
  ]);

  accountPublicKey?: PublicKey;
  key: MetaplexKey = MetaplexKey.StoreV1;
  public: 0 | 1;
  auctionProgram: PublicKey;
  tokenVaultProgram: PublicKey;
  tokenMetadataProgram: PublicKey;
  tokenProgram: PublicKey;

  get isPublic(): boolean {
    return this.public === 1;
  }

  constructor(args: Omit<Store, 'key' | 'isPublic'>) {
    Object.assign(this, args);
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): Store {
    const store = deserializeUnchecked(
      Store.SCHEMA,
      Store,
      accountWithPublicKey.account.data,
    ) as Store;

    store.accountPublicKey = accountWithPublicKey.pubkey;

    return store;
  }
}
