import {
  AuctionManagerState,
  AuctionManagerStatus,
} from '../AuctionManagerState';

describe('AuctionManagerState', () => {
  it('should instantiate with the correct values', () => {
    const auctionManagerState = new AuctionManagerState({
      winningConfigItemsValidated: 1,
      status: AuctionManagerStatus.Finished,
      winningConfigStates: [],
    });

    expect(auctionManagerState).toMatchSnapshot();
  });
});
