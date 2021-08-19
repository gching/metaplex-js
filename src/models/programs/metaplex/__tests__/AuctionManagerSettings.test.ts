import { AuctionManagerSettings } from '../AuctionManagerSettings';

describe('AuctionManagerSettings', () => {
  it('should instantiate with the correct values', () => {
    const auctionManagerSettings = new AuctionManagerSettings({
      winningConfigs: [],
    });

    expect(auctionManagerSettings).toMatchSnapshot();
  });
});
