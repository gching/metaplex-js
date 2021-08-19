import { Edition } from '../../../models/programs/token-metadata/Edition';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { generateFixtureAccountData } from '../__utils__/fixtureAccountData';
import { MasterEditionV1 } from '../../../models/programs/token-metadata/MasterEditionV1';
import { MasterEditionV2 } from '../../../models/programs/token-metadata/MasterEditionV2';

export const EDITION = new Edition({
  accountPublicKey: PublicKey.default,
  edition: new BN(0),
  parent: PublicKey.default,
});

export const EDITION_PROGRAM = generateFixtureAccountData(
  Edition.SCHEMA,
  EDITION,
);

export const MASTER_EDITION_V1 = new MasterEditionV1({
  accountPublicKey: PublicKey.default,
  oneTimePrintingAuthorizationMint: PublicKey.default,
  supply: new BN(0),
  printingMint: PublicKey.default,
});

export const MASTER_EDITION_V1_PROGRAM = generateFixtureAccountData(
  MasterEditionV1.SCHEMA,
  MASTER_EDITION_V1,
);

export const MASTER_EDITION_V2 = new MasterEditionV2({
  accountPublicKey: PublicKey.default,
  supply: new BN(0),
});

export const MASTER_EDITION_V2_PROGRAM = generateFixtureAccountData(
  MasterEditionV2.SCHEMA,
  MASTER_EDITION_V2,
);
