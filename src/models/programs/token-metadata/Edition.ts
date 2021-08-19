import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { MetadataKey } from './MetadataKey';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class Edition {
  static SCHEMA: BorshSchema = new Map([
    [
      Edition,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['parent', 'pubkey'],
          ['edition', 'u64'],
        ],
      },
    ],
  ]);

  key = MetadataKey.EditionV1;
  accountPublicKey?: PublicKey;
  /// Points at MasterEdition struct
  parent: PublicKey;
  /// Starting at 0 for master record, this is incremented for each edition minted.
  edition: BN;

  constructor(args: Omit<Edition, 'key'>) {
    this.accountPublicKey = args.accountPublicKey;
    this.parent = args.parent;
    this.edition = args.edition;
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): Edition {
    const edition = deserializeUnchecked(
      Edition.SCHEMA,
      Edition,
      accountWithPublicKey.account.data,
    ) as Edition;

    return new Edition({
      ...edition,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
