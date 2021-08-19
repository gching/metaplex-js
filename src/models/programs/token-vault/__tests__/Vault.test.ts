import { PublicKey } from '@solana/web3.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';
import { Vault, VaultState } from '../Vault';
import BN from 'bn.js';

describe('Vault', () => {
  it('should instantiate with the correct values', () => {
    const inst = new Vault({
      accountPublicKey: PublicKey.default,
      tokenProgram: PublicKey.default,
      authority: PublicKey.default,
      fractionMint: PublicKey.default,
      fractionTreasury: PublicKey.default,
      pricingLookupAddress: PublicKey.default,
      redeemTreasury: PublicKey.default,
      lockedPricePerShare: new BN(0),
      tokenTypeCount: 0,
      allowFurtherShareCreation: 1,
      state: VaultState.Combined,
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new Vault({
      accountPublicKey: PublicKey.default,
      tokenProgram: PublicKey.default,
      authority: PublicKey.default,
      fractionMint: PublicKey.default,
      fractionTreasury: PublicKey.default,
      pricingLookupAddress: PublicKey.default,
      redeemTreasury: PublicKey.default,
      lockedPricePerShare: new BN(0),
      tokenTypeCount: 0,
      allowFurtherShareCreation: 1,
      state: VaultState.Combined,
    });

    itShouldDeserialize(Vault, inst);
  });
});
