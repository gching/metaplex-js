import { Auction, AuctionState } from '../Auction';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { BidState, BidStateType } from '../BidState';
import { PriceFloor, PriceFloorType } from '../PriceFloor';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';

describe('Auction', () => {
  it('should instantiate with the correct values', () => {
    const auction = new Auction({
      authority: PublicKey.default,
      tokenMint: PublicKey.default,
      totalUncancelledBids: new BN(0),
      bidState: new BidState({
        bids: [],
        max: new BN(0),
        type: BidStateType.EnglishAuction,
      }),
      priceFloor: new PriceFloor({
        type: PriceFloorType.BlindedPrice,
      }),
      state: AuctionState.Created,
    });

    expect(auction).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const auction = new Auction({
      authority: PublicKey.default,
      lastBid: new BN(0),
      tokenMint: PublicKey.default,
      totalUncancelledBids: new BN(0),
      bidState: new BidState({
        bids: [],
        max: new BN(0),
        type: BidStateType.EnglishAuction,
      }),
      priceFloor: new PriceFloor({
        type: PriceFloorType.BlindedPrice,
      }),
      state: AuctionState.Created,
    });

    auction.accountPublicKey = PublicKey.default;

    itShouldDeserialize(Auction, auction);
  });
});
