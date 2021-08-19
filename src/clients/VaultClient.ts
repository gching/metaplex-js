import { BaseClient } from './BaseClient';
import { generatePublicKey } from '../utils/generatePublicKey';
import { SafetyDepositBox, Vault } from '../models';
import { PublicKeyOrPublicKeyInit } from '../utils/publicTypes';

/**
 * Client to mainly interact with {@link Vault} and associated entities.
 */
export class VaultClient extends BaseClient {
  /**
   * Fetches all vaults.
   * @returns A list of vaults.
   */
  async getVaults(): Promise<Vault[]> {
    const vaults = await this.connection.getProgramAccounts(
      this.programIds.vaultId,
      {
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: '4', // 4 is the byte 3 for VaultKey
            },
          },
        ],
      },
    );

    return vaults.map(Vault.decode);
  }

  /**
   * Fetches a fault by it's public key.
   * @param vaultPublicKey - The public key of the vault.
   * @returns The found fault or null if not found.
   */
  async getVault(
    vaultPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<Vault | null> {
    const vaultKey = generatePublicKey(vaultPublicKey);
    const vault = await this.connection.getAccountInfo(vaultKey);

    if (vault == null) {
      return null;
    }

    return Vault.decode({ pubkey: vaultKey, account: vault });
  }

  /**
   * Fetches all associated safety deposit boxes for a {@link Vault}.
   * @param vaultPublicKey - The public key of the vault.
   * @returns A list of safety deposit boxes for a vault.
   */
  async getVaultSafetyDepositBoxes(
    vaultPublicKey: PublicKeyOrPublicKeyInit,
  ): Promise<SafetyDepositBox[]> {
    const vaultKey = generatePublicKey(vaultPublicKey);

    const safetyDepositBoxes = await this.connection.getProgramAccounts(
      this.programIds.vaultId,
      {
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: '2', // 2 is 1 for VaultKey
            },
          },
          {
            memcmp: {
              offset: 1,
              bytes: vaultKey.toBase58(),
            },
          },
        ],
      },
    );

    return safetyDepositBoxes.map(SafetyDepositBox.decode);
  }
}
