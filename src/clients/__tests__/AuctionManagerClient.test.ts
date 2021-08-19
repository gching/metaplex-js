/* eslint-disable @typescript-eslint/unbound-method */
import { Connection, PublicKey } from '@solana/web3.js';
import { AuctionManagerClient } from '../AuctionManagerClient';
import {
  AUCTION_MANAGER_PROGRAMS,
  AUCTION_MANAGERS,
} from './__fixtures__/auctionManagers';
import { PROGRAM_IDS as programIds } from './__fixtures__/programIds';
const MockConnection = jest.createMockFromModule<{
  Connection: jest.MockedClass<typeof Connection>;
}>('@solana/web3.js').Connection;

const client = new AuctionManagerClient({
  connection: new MockConnection('test'),
  programIds,
});

describe('AuctionManagerClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuctionManagers', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      await client.getAuctionManagers();

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
                bytes: '8', // 8  is 7 in MetaplexKeys
              },
            },
          ],
        },
      );
    });
    it('should filter by the provided store public key', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      const storePublicKey = PublicKey.default;

      await client.getAuctionManagers({ forStorePublicKey: storePublicKey });

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
                bytes: '8', // 8  is 7 in MetaplexKeys
              },
            },
            {
              memcmp: {
                offset: 1,
                bytes: storePublicKey.toBase58(),
              },
            },
          ],
        },
      );
    });
    it('should return all auction managers', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        AUCTION_MANAGER_PROGRAMS,
      );

      const results = await client.getAuctionManagers();

      expect(results).toDeepEqual(AUCTION_MANAGERS);
    });
  });
});
