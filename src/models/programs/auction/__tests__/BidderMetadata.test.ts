import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { BidderMetadata } from '../BidderMetadata';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';

describe('BidderMetadata', () => {
  it('should instantiate with the correct values', () => {
    const bidderMetadata = new BidderMetadata({
      bidderPubkey: PublicKey.default,
      auctionPubkey: PublicKey.default,
      lastBid: new BN(0),
      cancelled: 0,
      lastBidTimestamp: new BN(0),
    });

    expect(bidderMetadata).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const bidderMetadata = new BidderMetadata({
      bidderPubkey: PublicKey.default,
      auctionPubkey: PublicKey.default,
      lastBid: new BN(0),
      cancelled: 1,
      lastBidTimestamp: new BN(0),
    });

    bidderMetadata.accountPublicKey = PublicKey.default;

    itShouldDeserialize(BidderMetadata, bidderMetadata);
  });
});
