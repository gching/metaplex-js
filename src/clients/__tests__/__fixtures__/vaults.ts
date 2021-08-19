import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { Vault, VaultState } from '../../../models/programs/token-vault/Vault';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';

export const VAULTS = [
  new Vault({
    accountPublicKey: PublicKey.default,
    tokenProgram: PublicKey.default,
    authority: PublicKey.default,
    fractionMint: PublicKey.default,
    fractionTreasury: PublicKey.default,
    pricingLookupAddress: PublicKey.default,
    redeemTreasury: PublicKey.default,
    lockedPricePerShare: new BN(0),
    tokenTypeCount: 0,
    allowFurtherShareCreation: 1,
    state: VaultState.Combined,
  }),
  new Vault({
    accountPublicKey: PublicKey.default,
    tokenProgram: PublicKey.default,
    authority: PublicKey.default,
    fractionMint: PublicKey.default,
    fractionTreasury: PublicKey.default,
    pricingLookupAddress: PublicKey.default,
    redeemTreasury: PublicKey.default,
    lockedPricePerShare: new BN(0),
    tokenTypeCount: 0,
    allowFurtherShareCreation: 1,
    state: VaultState.Combined,
  }),
  new Vault({
    accountPublicKey: PublicKey.default,
    tokenProgram: PublicKey.default,
    authority: PublicKey.default,
    fractionMint: PublicKey.default,
    fractionTreasury: PublicKey.default,
    pricingLookupAddress: PublicKey.default,
    redeemTreasury: PublicKey.default,
    lockedPricePerShare: new BN(0),
    tokenTypeCount: 0,
    allowFurtherShareCreation: 1,
    state: VaultState.Combined,
  }),
];

export const VAULT_PROGRAMS = generateFixtureAccountDataList(
  Vault.SCHEMA,
  VAULTS,
);
