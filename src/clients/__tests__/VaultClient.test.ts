/* eslint-disable @typescript-eslint/unbound-method */
import { Connection, PublicKey } from '@solana/web3.js';
import { PROGRAM_IDS as programIds } from './__fixtures__/programIds';
import { VaultClient } from '../VaultClient';
import { VAULT_PROGRAMS, VAULTS } from './__fixtures__/vaults';
import {
  SAFETY_DEPOSIT_BOX_PROGRAMS,
  SAFETY_DEPOSIT_BOXES,
} from './__fixtures__/safetyDepositBoxes';

const MockConnection = jest.createMockFromModule<{
  Connection: jest.MockedClass<typeof Connection>;
}>('@solana/web3.js').Connection;

const client = new VaultClient({
  connection: new MockConnection('test'),
  programIds,
});

describe('VaultClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getVaults', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      await client.getVaults();

      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.vaultId,
        {
          filters: [
            {
              memcmp: {
                offset: 0,
                bytes: '4',
              },
            },
          ],
        },
      );
    });

    it('should return all vaults', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        VAULT_PROGRAMS,
      );

      const results = await client.getVaults();

      expect(results).toDeepEqual(VAULTS);
    });
  });

  describe('getVault', () => {
    it('should get the account info of a vault', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      await client.getVault(PublicKey.default);

      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(MockConnection.prototype.getAccountInfo).toHaveBeenCalledWith(
        PublicKey.default,
      );
    });
    it('should return null if not found', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(null);

      const results = await client.getVault(PublicKey.default);

      expect(results).toBeNull();
    });
    it('should return a found vault', async () => {
      MockConnection.prototype.getAccountInfo.mockResolvedValueOnce(
        VAULT_PROGRAMS[0].account,
      );

      const results = await client.getVault(PublicKey.default);

      expect(results).toDeepEqual(VAULTS[0]);
    });
  });

  describe('getVaultSafetyDepositBoxes', () => {
    it('should get the correct program accounts', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce([]);

      const vaultKey = PublicKey.default;

      await client.getVaultSafetyDepositBoxes(vaultKey);

      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledTimes(
        1,
      );
      expect(MockConnection.prototype.getProgramAccounts).toHaveBeenCalledWith(
        programIds.vaultId,
        {
          filters: [
            {
              memcmp: {
                offset: 0,
                bytes: '2',
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
    });
    it('should return all safety deposit boxes', async () => {
      MockConnection.prototype.getProgramAccounts.mockResolvedValueOnce(
        SAFETY_DEPOSIT_BOX_PROGRAMS,
      );

      const results = await client.getVaultSafetyDepositBoxes(
        PublicKey.default,
      );

      expect(results).toDeepEqual(SAFETY_DEPOSIT_BOXES);
    });
  });
});
