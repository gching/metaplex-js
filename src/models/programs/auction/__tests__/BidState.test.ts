import BN from 'bn.js';
import { BidState, BidStateType } from '../BidState';
import { Bid } from '../Bid';
import { PublicKey } from '@solana/web3.js';

describe('BidState', () => {
  it('should instantiate with the correct values', () => {
    const bidState = new BidState({
      bids: [
        new Bid({
          key: PublicKey.default,
          amount: new BN(0),
        }),
      ],
      max: new BN(0),
      type: BidStateType.EnglishAuction,
    });

    expect(bidState).toMatchSnapshot();
  });
});
