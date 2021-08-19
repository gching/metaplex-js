import { BaseClient } from './BaseClient';
import { generatePublicKey } from '../utils/generatePublicKey';
import { TransactionSignature } from '@solana/web3.js';
import { TransactionsBuilder } from '../builders/TransactionsBuilder';
import { StoreDirector } from '../directors/StoreDirector';
import { Store } from '../models';
import { PublicKeyOrPublicKeyInit } from '../utils/publicTypes';

/**
 * Client to mainly interact with {@link Store} and all associated entities.
 */
export class StoreClient extends BaseClient {
  /**
   * Fetches all stores.
   * @returns A list of stores.
   */
  async getStores(): Promise<Store[]> {
    const stores = await this.connection.getProgramAccounts(
      this.programIds.metaplexId,
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

    return stores.map(Store.decode);
  }

  /**
   * Fetches a store by it's public key
   * @param storePublicKey - The store's public key.
   * @returns The store or null if not found.
   */
  async getStore(
    storePublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<Store | null> {
    const storeKey = generatePublicKey(storePublicKey);

    const store = await this.connection.getAccountInfo(storeKey);

    if (store == null) {
      return null;
    }

    return Store.decode({ pubkey: storeKey, account: store });
  }

  /**
   * Creates or updates a store on Metaplex.
   *
   * @beta
   *
   * @param args - Parameters to provide for the store.
   * @returns A list of transaction signatures associated to creating or updating the store.
   */
  async upsertStore(args: {
    storePublicKey: PublicKeyOrPublicKeyInit;
    storeAdminPublicKey: PublicKeyOrPublicKeyInit;
    isPublic: boolean;
    whitelistedCreators: {
      address: PublicKeyOrPublicKeyInit;
      activated: boolean;
    }[];
  }): Promise<TransactionSignature[]> {
    const storeKey = generatePublicKey(args.storePublicKey);
    const storeAdminKey = generatePublicKey(args.storeAdminPublicKey);

    const builder = new TransactionsBuilder();
    const director = new StoreDirector(builder, this.programIds);
    await director.createStore({
      storePublicKey: storeKey,
      storeAdminPublicKey: storeAdminKey,
      isPublic: args.isPublic,
      whitelistedCreators: args.whitelistedCreators.map((creator) => {
        return {
          ...creator,
          address: generatePublicKey(creator.address),
        };
      }),
    });

    return this.sendTransactions(storeAdminKey, builder);
  }
}
