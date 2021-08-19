import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import {Bid} from '../Bid';

describe('Bid', () => {
  it('should instantiate with the correct values', () => {
    const args = {
      key: PublicKey.default,
      amount: new BN(0),
    };

    const bid = new Bid(args);

    expect(bid.key).toBe(args.key);
    expect(bid.amount).toBe(args.amount);
  });
});
