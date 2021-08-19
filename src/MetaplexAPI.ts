/**
 * @module MetaplexAPI
 * The main module to interact with Metaplex
 */
import './utils/extendBorsh';
import { Commitment, Connection, PublicKey } from '@solana/web3.js';
import {
  ConstructorProgramIds,
  OnSignTransactions,
  PublicKeyOrPublicKeyInit,
} from './utils/publicTypes';
import { generatePublicKey } from './utils/generatePublicKey';
import {
  AuctionClient,
  AuctionManagerClient,
  MetadataClient,
  StoreClient,
  VaultClient,
} from './clients';
import { ProgramPublicKeyIds } from './utils/privateTypes';

export enum ChainId {
  MainnetBeta = 101,
  Testnet = 102,
  Devnet = 103,
}

/**
 * Constructor parameters mainly for instantiating the MetaplexAPI.
 */
export interface ConstructorOptions {
  /**
   * The endpoint to connect to the Solana network.
   */
  endpoint: string;
  /**
   * The default commitment desired when querying state.
   */
  commitment?: Commitment;
  chainId?: ChainId;
  /**
   * Override the default program IDs to be used to interact with Metaplex
   */
  programIds?: ConstructorProgramIds;
  /**
   * An optional callback to be called when a transaction needs to be signed.
   */
  onSignTransactions?: OnSignTransactions;
}

const DEFAULT_PROGRAM_IDS: ProgramPublicKeyIds = {
  metadataId: new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
  auctionId: new PublicKey('auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8'),
  vaultId: new PublicKey('vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn'),
  metaplexId: new PublicKey('p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98'),
  tokenId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
  systemId: new PublicKey('11111111111111111111111111111111'),
};

/**
 * A very high level API wrapper class for Metaplex that will be used to interact with Metaplex.
 */
export class MetaplexAPI {
  /**
   * Instance to interact with {@link Store} and all related data from the Metaplex program
   */
  readonly store: StoreClient;
  /**
   * Instance to interact with {@link AuctionManager} and all related data from the Metaplex program
   */
  readonly auctionManager: AuctionManagerClient;
  /**
   * Instance to interact with{@link Auction} and all related data from the Auction program
   */
  readonly auction: AuctionClient;
  /**
   * Instance to interact with {@link Metadata} and all related data from the Token Metadata program
   */
  readonly metadata: MetadataClient;
  /**
   * Instance to interact with {@link Vault} and all related data from the Token Vault program
   */
  readonly vault: VaultClient;
  #chainId: ChainId;

  /**
   * Instantiate the MetaplexAPI
   * @param options - settings to provide to the MetaplexAPI
   */
  constructor(options: ConstructorOptions) {
    this.#chainId = options.chainId ?? ChainId.MainnetBeta;

    const connection = new Connection(options.endpoint, options.commitment);
    const programIds = { ...DEFAULT_PROGRAM_IDS };
    const onSignTransactions = options.onSignTransactions;

    // Go through each passed in program ids and update it to our program Ids.
    for (const programIdName in options.programIds) {
      const programIdPublicKey: PublicKeyOrPublicKeyInit | undefined =
        options.programIds[programIdName as keyof ConstructorProgramIds];

      if (programIdPublicKey == null) {
        continue;
      }

      programIds[programIdName as keyof ProgramPublicKeyIds] =
        generatePublicKey(programIdPublicKey);
    }

    const clientOptions = {
      connection,
      programIds,
      onSignTransactions,
    };

    this.store = new StoreClient(clientOptions);
    this.auctionManager = new AuctionManagerClient(clientOptions);
    this.auction = new AuctionClient(clientOptions);
    this.metadata = new MetadataClient(clientOptions);
    this.vault = new VaultClient(clientOptions);
  }
}
