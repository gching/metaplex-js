import { generatePublicKey } from '../generatePublicKey';
import { PublicKey } from '@solana/web3.js';

describe('generatePublicKey', () => {
  it('should return a PublicKey if called with a PublicKey', () => {
    const key = PublicKey.default;

    expect(generatePublicKey(key)).toBe(key);
  });

  it('should return a PublicKey of a base58 string if called with a base58 string', () => {
    const stringKey = PublicKey.default.toBase58();

    expect(generatePublicKey(stringKey).toBase58()).toEqual(stringKey);
  });

  it('should throw if called with invalid values', () => {
    expect(() => generatePublicKey('')).toThrow();
  });
});
