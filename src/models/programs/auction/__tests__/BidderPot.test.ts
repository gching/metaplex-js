import { PublicKey } from '@solana/web3.js';
import { BidderPot } from '../BidderPot';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';

describe('BidderPot', () => {
  it('should instantiate with the correct values', () => {
    const bidderPot = new BidderPot({
      bidderPot: PublicKey.default,
      bidderAct: PublicKey.default,
      auctionAct: PublicKey.default,
      emptied: 0,
    });

    expect(bidderPot).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const bidderPot = new BidderPot({
      bidderPot: PublicKey.default,
      bidderAct: PublicKey.default,
      auctionAct: PublicKey.default,
      emptied: 0,
    });

    bidderPot.accountPublicKey = PublicKey.default;

    itShouldDeserialize(BidderPot, bidderPot);
  });
});
