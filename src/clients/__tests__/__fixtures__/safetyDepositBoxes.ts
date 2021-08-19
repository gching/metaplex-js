import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { SafetyDepositBox } from '../../../models/programs/token-vault/SafetyDepositBox';
import { PublicKey } from '@solana/web3.js';

export const SAFETY_DEPOSIT_BOXES = [
  new SafetyDepositBox({
    accountPublicKey: PublicKey.default,
    vault: PublicKey.default,
    store: PublicKey.default,
    order: 5,
    tokenMint: PublicKey.default,
  }),
  new SafetyDepositBox({
    accountPublicKey: PublicKey.default,
    vault: PublicKey.default,
    store: PublicKey.default,
    order: 5,
    tokenMint: PublicKey.default,
  }),
  new SafetyDepositBox({
    accountPublicKey: PublicKey.default,
    vault: PublicKey.default,
    store: PublicKey.default,
    order: 5,
    tokenMint: PublicKey.default,
  }),
];

export const SAFETY_DEPOSIT_BOX_PROGRAMS = generateFixtureAccountDataList(
  SafetyDepositBox.SCHEMA,
  SAFETY_DEPOSIT_BOXES,
);
