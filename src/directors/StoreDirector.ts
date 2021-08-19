import {
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';
import { SetStoreArgs } from '../models/programs/metaplex/SetStoreArgs';
import { TransactionsBuilder } from '../builders/TransactionsBuilder';
import { SetWhitelistedCreatorArgs } from '../models/programs/metaplex/SetWhitelistedCreatorArgs';

const METAPLEX_PREFIX = 'metaplex';

export class StoreDirector {
  #builder: TransactionsBuilder;
  #programIds: {
    auctionId: PublicKey;
    metadataId: PublicKey;
    vaultId: PublicKey;
    metaplexId: PublicKey;
    tokenId: PublicKey;
    systemId: PublicKey;
  };

  constructor(
    builder: TransactionsBuilder,
    programIds: {
      auctionId: PublicKey;
      metadataId: PublicKey;
      vaultId: PublicKey;
      metaplexId: PublicKey;
      tokenId: PublicKey;
      systemId: PublicKey;
    },
  ) {
    this.#builder = builder;
    this.#programIds = programIds;
  }

  set builder(builder: TransactionsBuilder) {
    this.#builder = builder;
  }

  async createStore(args: {
    storePublicKey: PublicKey;
    storeAdminPublicKey: PublicKey;
    isPublic: boolean;
    whitelistedCreators: {
      address: PublicKey;
      activated: boolean;
    }[];
  }) {
    const {
      storePublicKey,
      storeAdminPublicKey,
      isPublic,
      whitelistedCreators,
    } = args;
    const { tokenId, vaultId, metadataId, auctionId, systemId, metaplexId } =
      this.#programIds;

    const data = new SetStoreArgs({ public: isPublic });

    const keys = [
      {
        pubkey: storePublicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: storeAdminPublicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: storeAdminPublicKey,
        isSigner: true,
        isWritable: false,
      },
      { pubkey: tokenId, isSigner: false, isWritable: false },
      {
        pubkey: vaultId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: metadataId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: auctionId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: systemId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false,
      },
    ];

    this.builder.addTransactionByInstructionsWithSigners([
      new TransactionInstruction({
        keys,
        programId: metaplexId,
        data: data.encode(),
      }),
    ]);

    // Go through each creator and get the PDA.
    const allCreatorsWithPDA = await Promise.all(
      whitelistedCreators.map(async (creator) => {
        const programDerivedAddress = await PublicKey.findProgramAddress(
          [
            Buffer.from(METAPLEX_PREFIX),
            metaplexId.toBuffer(),
            storePublicKey.toBuffer(),
            creator.address.toBuffer(),
          ],
          metaplexId,
        );

        return {
          ...creator,
          programDerivedAddress: programDerivedAddress[0],
        };
      }),
    );

    allCreatorsWithPDA.forEach((creator) => {
      const keys = [
        {
          pubkey: creator.programDerivedAddress,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: storeAdminPublicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: storeAdminPublicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: creator.address,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: storePublicKey,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: systemId,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
      ];
      const data = new SetWhitelistedCreatorArgs(creator);

      this.builder.addTransactionByInstructionsWithSigners([
        new TransactionInstruction({
          keys,
          programId: metaplexId,
          data: data.encode(),
        }),
      ]);
    });
  }
}
