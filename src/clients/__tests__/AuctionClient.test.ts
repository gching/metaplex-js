/* eslint-disable @typescript-eslint/unbound-method */
import { Connection, PublicKey } from '@solana/web3.js';
import { AuctionClient } from '../AuctionClient';
import { AUCTION_PROGRAMS, AUCTIONS } from './__fixtures__/auctions';
import { BIDDER_PROGRAMS, BIDDERS } from './__fixtures__/bidders';
import { PROGRAM_IDS as programIds } from './__fixtures__/programIds';
import { BIDDER_POT_PROGRAMS, BIDDER_POTS } from './__fixtures__/bidderPots';

const MockConnection = jest.createMockFromModule<{
  Connection: jest.MockedClass<typeof Connection>;
}>('@solana/web3.js').Connection;

const client = new AuctionClient({
  connection: new MockConnection('test'),
  programIds,
});

describe('AuctionClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuctions', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      await client.getAuctions();

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.auctionId,
      );
    });
    it('should return all auctions', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        AUCTION_PROGRAMS,
      );

      const results = await client.getAuctions();

      expect(results).toDeepEqual(AUCTIONS);
    });
    it('should not return non-auctions', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        BIDDER_PROGRAMS,
      );

      const results = await client.getAuctions();

      expect(results).toHaveLength(0);
    });
  });
  describe('getAuction', () => {
    it('should get the account info of an auction', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      await client.getAuction(PublicKey.default);

      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledWith(
        PublicKey.default,
      );
    });
    it('should return null if not found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      const results = await client.getAuction(PublicKey.default);

      expect(results).toBeNull();
    });
    it('should return a found auction', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        AUCTION_PROGRAMS[0].account,
      );

      const auctionKey = PublicKey.default;

      const results = await client.getAuction(auctionKey);

      expect(results).toDeepEqual(AUCTIONS[0]);
    });
  });

  describe('getAuctionBidders', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);
      const auctionKey = PublicKey.default;

      await client.getAuctionBidders(auctionKey);

      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.auctionId,
        {
          filters: [
            { dataSize: 32 + 32 + 8 + 8 + 1 },
            {
              memcmp: {
                offset: 32,
                bytes: auctionKey.toBase58(),
              },
            },
          ],
        },
      );
    });

    it('should return all bidders of an auction', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        BIDDER_PROGRAMS,
      );

      const results = await client.getAuctionBidders(PublicKey.default);

      expect(results).toDeepEqual(BIDDERS);
    });
  });

  describe('getAuctionBidderPots', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);
      const auctionKey = PublicKey.default;

      await client.getAuctionBidderPots(auctionKey);

      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.auctionId,
        {
          filters: [
            { dataSize: 32 + 32 + 32 + 1 },
            {
              memcmp: {
                offset: 64,
                bytes: auctionKey.toBase58(),
              },
            },
          ],
        },
      );
    });
    it('should return all bidder pots of an auction', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        BIDDER_POT_PROGRAMS,
      );

      const results = await client.getAuctionBidderPots(PublicKey.default);

      expect(results).toDeepEqual(BIDDER_POTS);
    });
  });
});
