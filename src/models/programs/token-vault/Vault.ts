import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { VaultKey } from './VaultKey';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export enum VaultState {
  Inactive = 0,
  Active = 1,
  Combined = 2,
  Deactivated = 3,
}

export class Vault {
  static SCHEMA: BorshSchema = new Map([
    [
      Vault,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['tokenProgram', 'pubkey'],
          ['fractionMint', 'pubkey'],
          ['authority', 'pubkey'],
          ['fractionTreasury', 'pubkey'],
          ['redeemTreasury', 'pubkey'],
          ['allowFurtherShareCreation', 'u8'],
          ['pricingLookupAddress', 'pubkey'],
          ['tokenTypeCount', 'u8'],
          ['state', 'u8'],
          ['lockedPricePerShare', 'u64'],
        ],
      },
    ],
  ]);
  key = VaultKey.VaultV1;
  accountPublicKey?: PublicKey;
  /// Store token program used
  tokenProgram: PublicKey;
  /// Mint that produces the fractional shares
  fractionMint: PublicKey;
  /// Authority who can make changes to the token-vault
  authority: PublicKey;
  /// treasury where fractional shares are held for redemption by authority
  fractionTreasury: PublicKey;
  /// treasury where monies are held for fractional share holders to redeem(burn) shares once buyout is made
  redeemTreasury: PublicKey;
  /// Can authority mint more shares from fraction_mint after activation
  allowFurtherShareCreation: 0 | 1;

  /// Must point at an ExternalPriceAccount, which gives permission and price for buyout.
  pricingLookupAddress: PublicKey;
  /// In inactive state, we use this to set the order key on Safety Deposit Boxes being added and
  /// then we increment it and save so the next safety deposit box gets the next number.
  /// In the Combined state during token redemption by authority, we use it as a decrementing counter each time
  /// The authority of the token-vault withdrawals a Safety Deposit contents to count down how many
  /// are left to be opened and closed down. Once this hits zero, and the fraction mint has zero shares,
  /// then we can deactivate the token-vault.
  tokenTypeCount: number;
  state: VaultState;

  /// Once combination happens, we copy price per share to token-vault so that if something nefarious happens
  /// to external price account, like price change, we still have the math 'saved' for use in our calcs
  lockedPricePerShare: BN;

  get isAllowFurtherShareCreation(): boolean {
    return this.allowFurtherShareCreation === 1;
  }

  constructor(args: Omit<Vault, 'key' | 'isAllowFurtherShareCreation'>) {
    Object.assign(this, args);
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): Vault {
    const vault = deserializeUnchecked(
      Vault.SCHEMA,
      Vault,
      accountWithPublicKey.account.data,
    ) as Vault;

    return new Vault({
      ...vault,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
