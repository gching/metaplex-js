import { PublicKey } from '@solana/web3.js';
import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { Store } from '../../../models/programs/metaplex/Store';

export const STORES = [
  new Store({
    accountPublicKey: PublicKey.default,
    tokenVaultProgram: PublicKey.default,
    auctionProgram: PublicKey.default,
    tokenMetadataProgram: PublicKey.default,
    tokenProgram: PublicKey.default,
    public: 0,
  }),
  new Store({
    accountPublicKey: PublicKey.default,
    tokenVaultProgram: PublicKey.default,
    auctionProgram: PublicKey.default,
    tokenMetadataProgram: PublicKey.default,
    tokenProgram: PublicKey.default,
    public: 0,
  }),
  new Store({
    accountPublicKey: PublicKey.default,
    tokenVaultProgram: PublicKey.default,
    auctionProgram: PublicKey.default,
    tokenMetadataProgram: PublicKey.default,
    tokenProgram: PublicKey.default,
    public: 0,
  }),
];

export const STORE_PROGRAMS = generateFixtureAccountDataList(
  Store.SCHEMA,
  STORES,
);
