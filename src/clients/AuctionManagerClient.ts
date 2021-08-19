import { BaseClient } from './BaseClient';
import { generatePublicKey } from '../utils/generatePublicKey';
import { AuctionManager } from '../models';
import { PublicKeyOrPublicKeyInit } from '../utils/publicTypes';

/**
 * Client mainly to interact with {@link AuctionManager}.
 */
export class AuctionManagerClient extends BaseClient {
  /**
   * Gets all {@link AuctionManager} and optionally filter by a specific store by it's public key.
   * @param options.forStorePublicKey - Filter {@link AuctionManager} by a store's public key.
   * @returns A list of auction managers.
   */
  async getAuctionManagers(options?: {
    forStorePublicKey?: PublicKeyOrPublicKeyInit;
  }): Promise<AuctionManager[]> {
    const forStoreKey =
      options?.forStorePublicKey != null
        ? generatePublicKey(options.forStorePublicKey)
        : null;

    const filters = [
      {
        memcmp: {
          offset: 0,
          bytes: '8', // 8  is 7 in MetaplexKeys
        },
      },
    ];

    if (forStoreKey != null) {
      filters.push({
        memcmp: {
          offset: 1,
          bytes: forStoreKey.toBase58(),
        },
      });
    }

    const auctionManagers = await this.connection.getProgramAccounts(
      this.programIds.metaplexId,
      {
        filters,
      },
    );

    return auctionManagers.map(AuctionManager.decode);
  }
}
