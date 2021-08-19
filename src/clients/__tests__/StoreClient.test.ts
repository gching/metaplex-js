/* eslint-disable @typescript-eslint/unbound-method */
import { Connection, PublicKey } from '@solana/web3.js';
import { PROGRAM_IDS as programIds } from './__fixtures__/programIds';
import { StoreClient } from '../StoreClient';
import { STORE_PROGRAMS, STORES } from './__fixtures__/stores';

const MockConnection = jest.createMockFromModule<{
  Connection: jest.MockedClass<typeof Connection>;
}>('@solana/web3.js').Connection;

const client = new StoreClient({
  connection: new MockConnection('test'),
  programIds,
});

describe('StoreClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStores', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      await client.getStores();

      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.metaplexId,
        {
          filters: [
            {
              memcmp: {
                offset: 0,
                bytes: '4', // 4 is 3 for MetaplexKey
              },
            },
          ],
        },
      );
    });
    it('should return all stores', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        STORE_PROGRAMS,
      );

      const results = await client.getStores();

      expect(results).toDeepEqual(STORES);
    });
  });
  describe('getStore', () => {
    it('should get the account info of a store', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      await client.getStore(PublicKey.default);

      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledWith(
        PublicKey.default,
      );
    });
    it('should return null if not found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      const results = await client.getStore(PublicKey.default);

      expect(results).toBeNull();
    });
    it('should return a found store', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        STORE_PROGRAMS[0].account,
      );

      const results = await client.getStore(PublicKey.default);

      expect(results).toDeepEqual(STORES[0]);
    });
  });
});
