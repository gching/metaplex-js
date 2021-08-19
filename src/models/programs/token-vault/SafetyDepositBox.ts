import { PublicKey } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { VaultKey } from './VaultKey';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class SafetyDepositBox {
  static SCHEMA: BorshSchema = new Map([
    [
      SafetyDepositBox,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['vault', 'pubkey'],
          ['tokenMint', 'pubkey'],
          ['store', 'pubkey'],
          ['order', 'u8'],
        ],
      },
    ],
  ]);

  /// Each token type in a token-vault has it's own box that contains it's mint and a look-back
  key = VaultKey.SafetyDepositBoxV1;
  accountPublicKey?: PublicKey;
  /// VaultKey pointing to the parent token-vault
  vault: PublicKey;
  /// This particular token's mint
  tokenMint: PublicKey;
  /// Account that stores the tokens under management
  store: PublicKey;
  /// the order in the array of registries
  order: number;

  constructor(args: Omit<SafetyDepositBox, 'key'>) {
    Object.assign(this, args);
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): SafetyDepositBox {
    const box = deserializeUnchecked(
      SafetyDepositBox.SCHEMA,
      SafetyDepositBox,
      accountWithPublicKey.account.data,
    ) as SafetyDepositBox;

    return new SafetyDepositBox({
      ...box,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
