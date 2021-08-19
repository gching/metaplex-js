import { BaseClient } from './BaseClient';
import { generatePublicKey } from '../utils/generatePublicKey';
import {
  Edition,
  MasterEditionV1,
  MasterEditionV2,
  Metadata,
  MetadataKey,
} from '../models';
import { PublicKeyOrPublicKeyInit } from '../utils/publicTypes';

/**
 * Client mainly to interact with all token metadata related entities.
 */
export class MetadataClient extends BaseClient {
  // async getAllCreatorCreatedTokenMetadata(): void {
  //
  // }

  /**
   * Fetches all token metadata.
   * @returns A list of token metadatas.
   */
  async getTokenMetadatas(): Promise<Metadata[]> {
    const allMetadata = await this.connection.getProgramAccounts(
      this.programIds.metadataId,
      {
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: '5', // 5 is the byte 4 for MetadataKey
            },
          },
        ],
      },
    );

    return allMetadata.map(Metadata.decode);
  }

  /**
   * Fetches a token metadata by it's public key.
   * @param metadataPublicKey - The public key to fetch token metadata.
   * @returns Token metadata or null if not found.
   */
  async getTokenMetadata(
    metadataPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<Metadata | null> {
    const metadataKey = generatePublicKey(metadataPublicKey);
    const metadata = await this.connection.getAccountInfo(metadataKey);

    if (metadata == null) {
      return null;
    }

    const parsedMetadata = Metadata.decode({
      pubkey: metadataKey,
      account: metadata,
    });

    const editionKey = await parsedMetadata.getEditionKey(
      this.programIds.metadataId,
    );

    const edition = await this.getTokenEdition(editionKey);

    if (edition != null) {
      parsedMetadata.edition = edition;
    }

    return parsedMetadata;
  }

  /**
   * Fetches a token's edition by public key.
   * @param editionPublicKey - The public key to fetch the token edition.
   * @returns The version of the token edition or null if not found.
   */
  async getTokenEdition(
    editionPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<Edition | MasterEditionV1 | MasterEditionV2 | null> {
    const editionKey = generatePublicKey(editionPublicKey);
    const edition = await this.connection.getAccountInfo(editionKey);

    if (edition == null) {
      return null;
    }

    const decodeParam = {
      pubkey: editionKey,
      account: edition,
    };

    switch (edition.data[0]) {
      case MetadataKey.EditionV1:
        return Edition.decode(decodeParam);
      case MetadataKey.MasterEditionV1:
        return MasterEditionV1.decode(decodeParam);
      case MetadataKey.MasterEditionV2:
        return MasterEditionV2.decode(decodeParam);
      default:
        return null;
    }
  }

  /**
   * @beta
   */
  createTokenMetadata(): void {
    return;
  }
}
