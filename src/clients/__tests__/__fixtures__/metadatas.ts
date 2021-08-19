import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { Metadata } from '../../../models/programs/token-metadata/Metadata';
import { PublicKey } from '@solana/web3.js';
import { Data } from '../../../models/programs/token-metadata/Data';

export const METADATAS = [
  new Metadata({
    accountPublicKey: PublicKey.default,
    updateAuthority: PublicKey.default,
    data: new Data({
      uri: '1',
      sellerFeeBasisPoints: 0,
      name: 'test',
      symbol: 'test',
      creators: [],
    }),
    mint: PublicKey.default,
    isMutable: 0,
    primarySaleHappened: 1,
  }),
  new Metadata({
    accountPublicKey: PublicKey.default,
    updateAuthority: PublicKey.default,
    data: new Data({
      uri: '1',
      sellerFeeBasisPoints: 0,
      name: 'test',
      symbol: 'test',
      creators: [],
    }),
    mint: PublicKey.default,
    isMutable: 0,
    primarySaleHappened: 1,
  }),
  new Metadata({
    accountPublicKey: PublicKey.default,
    updateAuthority: PublicKey.default,
    data: new Data({
      uri: '1',
      sellerFeeBasisPoints: 0,
      name: 'test',
      symbol: 'test',
      creators: [],
    }),
    mint: PublicKey.default,
    isMutable: 0,
    primarySaleHappened: 1,
  }),
];

export const METADATA_PROGRAMS = generateFixtureAccountDataList(
  Metadata.SCHEMA,
  METADATAS,
);
