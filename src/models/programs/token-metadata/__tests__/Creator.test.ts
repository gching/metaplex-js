import { Creator } from '../Creator';
import { PublicKey } from '@solana/web3.js';

describe('Creator', () => {
  it('should instantiate with the correct values', () => {
    const inst = new Creator({
      address: PublicKey.default,
      share: 50,
      verified: 1,
    });

    expect(inst).toMatchSnapshot();
  });
});
