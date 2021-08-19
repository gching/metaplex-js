import { BaseClient } from './BaseClient';
import { generatePublicKey } from '../utils/generatePublicKey';
import { Auction, BidderMetadata, BidderPot } from '../models';
import { PublicKeyOrPublicKeyInit } from '../utils/publicTypes';

/**
 * Client mainly to interact with {@link Auction} and all associated entities.
 */
export class AuctionClient extends BaseClient {
  /**
   * Get all auctions.
   * @returns A list of all auctions.
   */
  async getAuctions(): Promise<Auction[]> {
    const auctions = await this.connection.getProgramAccounts(
      this.programIds.auctionId,
    );

    const parsedAuctions: Auction[] = auctions
      .map((auction) => {
        try {
          return Auction.decode(auction);
        } catch (e) {
          // empty catch.
          // we assume all auctions that can be parsed is Auction, and things that error are not.
        }
        return null;
      })
      .filter((auction) => auction != null) as Auction[];

    return parsedAuctions;
  }

  /**
   * Fetches an auction by its public key.
   * @param auctionPublicKey - Public key to lookup the auction account.
   * @returns Found [[Auction]] or null.
   */
  async getAuction(
    auctionPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<Auction | null> {
    const auctionKey = generatePublicKey(auctionPublicKey);

    const auction = await this.connection.getAccountInfo(auctionKey);

    if (auction == null) {
      return null;
    }

    return Auction.decode({ pubkey: auctionKey, account: auction });
  }

  /**
   * Fetches all {@link BidderMetadata} associated to a specific auction given the auction's public key.
   * @param auctionPublicKey - Public key to lookup the auction account.
   * @returns A list of {@link BidderMetadata}
   */
  async getAuctionBidders(
    auctionPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<BidderMetadata[]> {
    const auctionKey = generatePublicKey(auctionPublicKey);

    const bidders = await this.connection.getProgramAccounts(
      this.programIds.auctionId,
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

    return bidders.map(BidderMetadata.decode);
  }

  /**
   * Get all {@link BidderPot} associated to a specific auction.
   * @param auctionPublicKey - Public key to lookup the auction account.
   * @returns A list of {@link BidderPot}
   */
  async getAuctionBidderPots(
    auctionPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<BidderPot[]> {
    const auctionKey = generatePublicKey(auctionPublicKey);

    const bidderPots = await this.connection.getProgramAccounts(
      this.programIds.auctionId,
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

    return bidderPots.map(BidderPot.decode);
  }

  /**
   * @beta
   */
  createAuction(): void {
    return;
  }

  /**
   * @beta
   */
  createBidForAuction(): void {
    return;
  }
}
