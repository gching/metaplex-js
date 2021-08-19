import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { MetadataKey } from './MetadataKey';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class MasterEditionV2 {
  static SCHEMA: BorshSchema = new Map([
    [
      MasterEditionV2,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['supply', 'u64'],
          ['maxSupply', { kind: 'option', type: 'u64' }],
        ],
      },
    ],
  ]);

  key = MetadataKey.MasterEditionV2;
  accountPublicKey?: PublicKey;
  supply: BN;
  maxSupply?: BN;

  constructor(args: Omit<MasterEditionV2, 'key'>) {
    this.accountPublicKey = args.accountPublicKey;
    this.supply = args.supply;
    this.maxSupply = args.maxSupply;
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): MasterEditionV2 {
    const masterEdition = deserializeUnchecked(
      MasterEditionV2.SCHEMA,
      MasterEditionV2,
      accountWithPublicKey.account.data,
    ) as MasterEditionV2;

    return new MasterEditionV2({
      ...masterEdition,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
