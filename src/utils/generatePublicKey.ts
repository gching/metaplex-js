import { PublicKey } from '@solana/web3.js';
import { PublicKeyOrPublicKeyInit } from './publicTypes';

/**
 * Given a PublicKey or a Base58 string, it will generate and return a PublicKey
 * @param key - The key to turn into a PublicKey
 * @returns - the generated PublicKey
 */
export function generatePublicKey(key: PublicKeyOrPublicKeyInit): PublicKey {
  if (key instanceof PublicKey) {
    return key;
  }

  return new PublicKey(key);
}
