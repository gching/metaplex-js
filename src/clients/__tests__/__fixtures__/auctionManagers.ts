import { PublicKey } from '@solana/web3.js';
import { generateFixtureAccountDataList } from '../__utils__/fixtureAccountData';
import { AuctionManager } from '../../../models/programs/metaplex/AuctionManager';
import {
  AuctionManagerState,
  AuctionManagerStatus,
} from '../../../models/programs/metaplex/AuctionManagerState';
import { AuctionManagerSettings } from '../../../models/programs/metaplex/AuctionManagerSettings';

export const AUCTION_MANAGERS = [
  new AuctionManager({
    accountPublicKey: PublicKey.default,
    auction: PublicKey.default,
    authority: PublicKey.default,
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
  }),
  new AuctionManager({
    accountPublicKey: PublicKey.default,
    auction: PublicKey.default,
    authority: PublicKey.default,
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
  }),
  new AuctionManager({
    accountPublicKey: PublicKey.default,
    auction: PublicKey.default,
    authority: PublicKey.default,
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
  }),
];

export const AUCTION_MANAGER_PROGRAMS = generateFixtureAccountDataList(
  AuctionManager.SCHEMA,
  AUCTION_MANAGERS,
);
