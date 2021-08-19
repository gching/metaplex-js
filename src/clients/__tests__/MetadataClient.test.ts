/* eslint-disable @typescript-eslint/unbound-method */
import { Connection, PublicKey } from '@solana/web3.js';
import { MetadataClient } from '../MetadataClient';
import { METADATA_PROGRAMS, METADATAS } from './__fixtures__/metadatas';
import {
  EDITION,
  EDITION_PROGRAM,
  MASTER_EDITION_V1,
  MASTER_EDITION_V1_PROGRAM,
  MASTER_EDITION_V2,
  MASTER_EDITION_V2_PROGRAM,
} from './__fixtures__/editions';
import { STORE_PROGRAMS } from './__fixtures__/stores';
import { Metadata } from '../../models/programs/token-metadata/Metadata';
import { Edition } from '../../models/programs/token-metadata/Edition';
import { PROGRAM_IDS as programIds } from './__fixtures__/programIds';

const MockConnection = jest.createMockFromModule<{
  Connection: jest.MockedClass<typeof Connection>;
}>('@solana/web3.js').Connection;

const client = new MetadataClient({
  connection: new MockConnection('test'),
  programIds,
});

describe('MetadataClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTokenMetadatas', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      await client.getTokenMetadatas();

      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.metadataId,
        {
          filters: [
            {
              memcmp: {
                offset: 0,
                bytes: '5',
              },
            },
          ],
        },
      );
    });

    it('should return all metadatas', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        METADATA_PROGRAMS,
      );

      const results = await client.getTokenMetadatas();

      expect(results).toDeepEqual(METADATAS);
    });
  });

  describe('getTokenMetadata', () => {
    it('should get the account info of a metadata', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      await client.getTokenMetadata(PublicKey.default);

      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledWith(
        PublicKey.default,
      );
    });

    it('should return null if not found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      const results = await client.getTokenMetadata(PublicKey.default);

      expect(results).toBeNull();
    });

    it('should return a found metadata with the edition included if found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        METADATA_PROGRAMS[0].account,
      );
      MockConnection.prototype.getAccountInfo.mockResolvedValue(null);

      const expectedMetadata = new Metadata({ ...METADATAS[0] });
      await expectedMetadata.getEditionKey(programIds.metadataId);

      const results = await client.getTokenMetadata(PublicKey.default);

      expect(results).toDeepEqual(expectedMetadata);
    });

    it('should return a found metadata with no edition if it is not found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        METADATA_PROGRAMS[0].account,
      );
      MockConnection.prototype.getAccountInfo.mockResolvedValue(
        EDITION_PROGRAM.account,
      );

      const expectedMetadata = new Metadata({
        ...METADATAS[0],
      });
      await expectedMetadata.getEditionKey(programIds.metadataId);
      expectedMetadata.edition = new Edition({
        ...EDITION,
        accountPublicKey: expectedMetadata.editionKey,
      });

      const results = await client.getTokenMetadata(PublicKey.default);

      expect(results).toDeepEqual(expectedMetadata);
    });
  });

  describe('getTokenEdition', () => {
    it('should get the account info of a type of token edition', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      const editionKey = PublicKey.default;

      await client.getTokenEdition(editionKey);

      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledWith(
        PublicKey.default,
      );
    });

    it('should return null if not found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      const results = await client.getTokenEdition(PublicKey.default);

      expect(results).toBeNull();
    });

    it('should return an Edition', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        EDITION_PROGRAM.account,
      );

      const results = await client.getTokenEdition(PublicKey.default);

      expect(results).toDeepEqual(EDITION);
    });

    it('should return a MasterEditionV1', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        MASTER_EDITION_V1_PROGRAM.account,
      );

      const results = await client.getTokenEdition(PublicKey.default);

      expect(results).toDeepEqual(MASTER_EDITION_V1);
    });

    it('should return a MasterEditionV2', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        MASTER_EDITION_V2_PROGRAM.account,
      );

      const results = await client.getTokenEdition(PublicKey.default);

      expect(results).toDeepEqual(MASTER_EDITION_V2);
    });

    it('should return null if the token edition is not supported', async () => {
      // Just some random program
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        STORE_PROGRAMS[0].account,
      );

      const results = await client.getTokenEdition(PublicKey.default);

      expect(results).toBeNull();
    });
  });
});
