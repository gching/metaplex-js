import { PublicKey } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { Data } from './Data';
import { Edition } from './Edition';
import { MasterEditionV1 } from './MasterEditionV1';
import { MasterEditionV2 } from './MasterEditionV2';
import { MetadataKey } from './MetadataKey';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class Metadata {
  static SCHEMA: BorshSchema = new Map([
    [
      Metadata,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['updateAuthority', 'pubkey'],
          ['mint', 'pubkey'],
          ['data', Data],
          ['primarySaleHappened', 'u8'], // bool
          ['isMutable', 'u8'], // bool
        ],
      },
    ],
    ...Data.SCHEMA,
  ]);

  key: MetadataKey = MetadataKey.MetadataV1;
  accountPublicKey?: PublicKey;
  updateAuthority: PublicKey;
  mint: PublicKey;
  data: Data;
  primarySaleHappened: 0 | 1;
  isMutable: 0 | 1;
  editionKey?: PublicKey;
  edition?: Edition | MasterEditionV1 | MasterEditionV2;

  get isPrimarySaleHappened(): boolean {
    return this.primarySaleHappened === 1;
  }

  get isMutableBool(): boolean {
    return this.isMutable === 1;
  }

  constructor(
    args: Omit<
      Metadata,
      'key' | 'isPrimarySaleHappened' | 'isMutableBool' | 'getEditionKey'
    >,
  ) {
    Object.assign(this, args);
  }

  async getEditionKey(metadataProgramKey: PublicKey): Promise<PublicKey> {
    if (this.editionKey) {
      return this.editionKey;
    }

    const seeds = [
      Buffer.from('metadata'),
      metadataProgramKey.toBuffer(),
      this.mint.toBuffer(),
      Buffer.from('edition'),
    ];

    const editionKey = await PublicKey.findProgramAddress(
      seeds,
      metadataProgramKey,
    );

    this.editionKey = editionKey[0];

    return this.editionKey;
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): Metadata {
    const metadata = deserializeUnchecked(
      Metadata.SCHEMA,
      Metadata,
      accountWithPublicKey.account.data,
    ) as Metadata;

    return new Metadata({
      ...metadata,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
