/**
 * Type and interface definitions that are exposed in public.
 */

import { PublicKey, PublicKeyInitData, Transaction } from '@solana/web3.js';

/**
 * Either a PublicKey or a Base58 string
 */
export type PublicKeyOrPublicKeyInit = PublicKey | PublicKeyInitData;

/**
 * A function that given a list of transactions, should sign the transactions and return it.
 */
export type OnSignTransactions = (
  transactions: Transaction[],
) => Promise<Transaction[]>;

/**
 * Defines a dictionary of optional program IDs. This is mainly used to override the default program ID settings for
 * Metaplex.
 */
export interface ConstructorProgramIds {
  /**
   * Auction program ID.
   */
  auctionId?: PublicKeyOrPublicKeyInit;
  /**
   * Metadata program ID.
   */
  metadataId?: PublicKeyOrPublicKeyInit;
  /**
   * Vault program ID.
   */
  vaultId?: PublicKeyOrPublicKeyInit;
  /**
   * Metaplex program ID.
   */
  metaplexId?: PublicKeyOrPublicKeyInit;
  /**
   * Token program ID.
   */
  tokenId?: PublicKeyOrPublicKeyInit;
  /**
   * System program ID.
   */
  systemId?: PublicKeyOrPublicKeyInit;
}
