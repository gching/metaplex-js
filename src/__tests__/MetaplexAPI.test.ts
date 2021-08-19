import {
  ConstructorProgramIds,
  OnSignTransactions,
} from '../utils/publicTypes';

const mockConnection = jest.fn();

import { MetaplexAPI } from '../MetaplexAPI';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {
  AuctionClient,
  VaultClient,
  StoreClient,
  AuctionManagerClient,
  MetadataClient,
} from '../clients';
import { ClientConstructorParams } from '../clients/BaseClient';
import { ProgramPublicKeyIds } from '../utils/privateTypes';

jest.mock('@solana/web3.js', () => {
  return {
    ...jest.requireActual('@solana/web3.js'),
    Connection: mockConnection,
  };
});
jest.mock('../clients');

const MockConnection = mockConnection;
const MockAuctionClient = AuctionClient as jest.Mock<AuctionClient>;
const MockVaultClient = VaultClient as jest.Mock<VaultClient>;
const MockStoreClient = StoreClient as jest.Mock<StoreClient>;
const MockAuctionManagerClient =
  AuctionManagerClient as jest.Mock<AuctionManagerClient>;
const MockMetadataClient = MetadataClient as jest.Mock<MetadataClient>;

function expectClientToBeInitialized<T>(
  instance: T,
  mockCls: jest.Mock,
  expectedParams: {
    onSignTransactions?: OnSignTransactions;
    programIds: ConstructorProgramIds;
    connection: Connection;
  },
) {
  const clientInst = mockCls.mock.instances[0] as T;
  expect(instance).toBe(clientInst);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const clientParams = mockCls.mock.calls[0][0] as ClientConstructorParams;
  expect(clientParams.connection).toBe(expectedParams.connection);
  expect(clientParams.onSignTransactions).toBe(
    expectedParams.onSignTransactions,
  );
  expect(clientParams.programIds).toEqual(expectedParams.programIds);
}

describe('MetaplexAPI', () => {
  beforeEach(() => {
    MockConnection.mockClear();
    MockAuctionClient.mockClear();
    MockAuctionManagerClient.mockClear();
    MockStoreClient.mockClear();
    MockVaultClient.mockClear();
    MockMetadataClient.mockClear();
  });

  describe('constructor', () => {
    it('should create a connection with the default parameters', () => {
      new MetaplexAPI({
        endpoint: '123',
      });

      expect(Connection).toHaveBeenCalledTimes(1);
      expect(Connection).toHaveBeenCalledWith('123', undefined);
    });

    it('should create a connection with the passed in commitment', () => {
      new MetaplexAPI({
        endpoint: '123',
        commitment: 'processed',
      });

      expect(Connection).toHaveBeenCalledTimes(1);
      expect(Connection).toHaveBeenCalledWith('123', 'processed');
    });

    it('should create all the accessible clients with the default parameters', () => {
      const inst = new MetaplexAPI({
        endpoint: '123',
      });

      const connectionInst = MockConnection.mock.instances[0] as Connection;

      const expectedOptions = {
        connection: connectionInst,
        programIds: {
          metadataId: new PublicKey(
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
          ),
          auctionId: new PublicKey(
            'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8',
          ),
          vaultId: new PublicKey('vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn'),
          metaplexId: new PublicKey(
            'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98',
          ),
          tokenId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          systemId: new PublicKey('11111111111111111111111111111111'),
        },
        onSignTransactions: undefined,
      };

      expectClientToBeInitialized(
        inst.auction,
        MockAuctionClient,
        expectedOptions,
      );
      expectClientToBeInitialized(inst.vault, MockVaultClient, expectedOptions);
      expectClientToBeInitialized(inst.store, MockStoreClient, expectedOptions);
      expectClientToBeInitialized(
        inst.metadata,
        MockMetadataClient,
        expectedOptions,
      );
      expectClientToBeInitialized(
        inst.auctionManager,
        MockAuctionManagerClient,
        expectedOptions,
      );
    });

    it('should create all the accessible clients with the passed in parameters', () => {
      const newProgramIds: ConstructorProgramIds = {
        metadataId: PublicKey.default,
        metaplexId: PublicKey.default,
        systemId: PublicKey.default,
        tokenId: PublicKey.default,
        vaultId: PublicKey.default,
        auctionId: PublicKey.default,
      };

      const onSignTransactions = jest.fn();

      const inst = new MetaplexAPI({
        endpoint: '123',
        programIds: newProgramIds,
        onSignTransactions,
      });

      const connectionInst = MockConnection.mock.instances[0] as Connection;

      const expectedOptions = {
        connection: connectionInst,
        programIds: newProgramIds as ProgramPublicKeyIds,
        onSignTransactions,
      };

      expectClientToBeInitialized(
        inst.auction,
        MockAuctionClient,
        expectedOptions,
      );
      expectClientToBeInitialized(inst.vault, MockVaultClient, expectedOptions);
      expectClientToBeInitialized(inst.store, MockStoreClient, expectedOptions);
      expectClientToBeInitialized(
        inst.metadata,
        MockMetadataClient,
        expectedOptions,
      );
      expectClientToBeInitialized(
        inst.auctionManager,
        MockAuctionManagerClient,
        expectedOptions,
      );
    });
  });
});

// import MetaplexAPI from './MetaplexAPI';
//
// const metaplexAPI = new MetaplexAPI({
//   endpoint: 'https://api.metaplex.solana.com/',
// });
//
// test('getStores', async () => {
//   const results = await metaplexAPI.getStores();
//
//   console.log(results[results.length - 1].accountPublicKey.toBase58());
//   console.log(results[results.length - 1]);
// });
//
// test('getStore', async () => {
//   const results = await metaplexAPI.getStore(
//     '6U3pKKsK27wVuYnZU4XnrEYAB2hxxWCtk5s3gTXKf5kA',
//   );
//
//   console.log(results);
//   console.log(results?.auctionProgram.toBase58());
//   console.log(results?.tokenVaultProgram.toBase58());
//   console.log(results?.tokenMetadataProgram.toBase58());
// });
//
// describe('getAuctionManagers', () => {
//   test('All', async () => {
//     const results = await metaplexAPI.getAuctionManagers();
//
//     console.log(results[0].store.toBase58());
//   });
//
//   test('By store', async () => {
//     const results = await metaplexAPI.getAuctionManagers({
//       forStorePublicKey: 'D3QWESencuJaaE2f24DfiUixV9wBHyFqRMKhHBUKAbQG',
//     });
//     console.log(results.map((result) => result.store.toBase58()));
//   });
// });
//
// test('getAuctionManagers', async () => {
//   const results = await metaplexAPI.getAuctionManagers();
//
//   console.log(results);
// });
//
// test('getAuctions', async () => {
//   const results = await metaplexAPI.getAuctions();
// });
//
// test('getAuction', async () => {
//   const results = await metaplexAPI.getAuction(
//     'E9dqK9YAUtRZXC7snNUH2puMBwuGfP1QBiV2rGrGyGYo',
//   );
//
//   console.log(results);
// });
//
// test('getAllTokenMetadata', async () => {
//   const results = await metaplexAPI.getAllTokenMetadata();
//
//   console.log(results[results.length - 1]);
//   console.log(results[results.length - 1].accountPublicKey.toBase58());
// });
//
// test('getTokenMetadata', async () => {
//   const results = await metaplexAPI.getTokenMetadata(
//     'GfHrSn2ZgHqBdrKQaPx4kZhsDuRvfJqVZPEDrSvdQ2tS',
//   );
//
//   console.log(results);
// });
//
// test('getTokenEdition', async () => {
//   const results = await metaplexAPI.getTokenEdition(
//     '8kMZ1fgE46eyXBhuWj26h4EEfmmPgZ8Dwm5cfV2upbTH',
//   );
//
//   console.log(results);
// });
//
// test('getVaults', async () => {
//   const results = await metaplexAPI.getVaults();
//   console.log(results[results.length - 1]);
//   console.log(results[results.length - 1].accountPublicKey.toBase58());
// });
//
// test('getVault', async () => {
//   const results = await metaplexAPI.getVault(
//     'BnMT5Yra5EUDqyt7KvL8GUFbFCAsdQvcnEy12AhURdAC',
//   );
//
//   console.log(results);
// });
//
// test('getVaultSafetyDepositBoxes', async () => {
//   const results = await metaplexAPI.getVaultSafetyDepositBoxes(
//     'BnMT5Yra5EUDqyt7KvL8GUFbFCAsdQvcnEy12AhURdAC',
//   );
//
//   console.log(results);
// });
