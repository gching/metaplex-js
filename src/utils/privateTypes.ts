/**
 * Types and interfaces that are used internally and not exposed.
 */

import { PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

/**
 * An account with data with it's corresponding pubkey.
 */
export interface AccountWithPublicKey {
  /**
   * The PublicKey of the account.
   */
  pubkey: PublicKey;
  /**
   * The account with it's data.
   */
  account: { data: Buffer };
}

/**
 * A dictionary of set program IDs.
 */
export interface ProgramPublicKeyIds {
  auctionId: PublicKey;
  metadataId: PublicKey;
  vaultId: PublicKey;
  metaplexId: PublicKey;
  tokenId: PublicKey;
  systemId: PublicKey;
}
