import { PublicKey } from '@solana/web3.js';
import { AuctionManager } from '../AuctionManager';
import { AuctionManagerSettings } from '../AuctionManagerSettings';
import {
  AuctionManagerState,
  AuctionManagerStatus,
} from '../AuctionManagerState';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';

describe('AuctionManager', () => {
  it('should instantiate with the correct values', () => {
    const auctionManager = new AuctionManager({
      auction: PublicKey.default,
      authority: PublicKey.default,
      accountPublicKey: PublicKey.default,
      store: PublicKey.default,
      vault: PublicKey.default,
      acceptPayment: PublicKey.default,
      state: new AuctionManagerState({
        winningConfigItemsValidated: 5,
        status: AuctionManagerStatus.Finished,
        winningConfigStates: [],
      }),
      settings: new AuctionManagerSettings({
        winningConfigs: [],
      }),
    });

    expect(auctionManager).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const auctionManager = new AuctionManager({
      auction: PublicKey.default,
      authority: PublicKey.default,
      accountPublicKey: PublicKey.default,
      store: PublicKey.default,
      vault: PublicKey.default,
      acceptPayment: PublicKey.default,
      state: new AuctionManagerState({
        winningConfigItemsValidated: 5,
        status: AuctionManagerStatus.Finished,
        winningConfigStates: [],
      }),
      settings: new AuctionManagerSettings({
        winningConfigs: [],
      }),
    });

    auctionManager.accountPublicKey = PublicKey.default;

    itShouldDeserialize(AuctionManager, auctionManager);
  });
});
