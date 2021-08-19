import { PublicKey } from '@solana/web3.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';
import { Store } from '../Store';

describe('Store', () => {
  it('should instantiate with the correct values', () => {
    const inst = new Store({
      accountPublicKey: PublicKey.default,
      tokenVaultProgram: PublicKey.default,
      auctionProgram: PublicKey.default,
      tokenMetadataProgram: PublicKey.default,
      tokenProgram: PublicKey.default,
      public: 0,
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new Store({
      accountPublicKey: PublicKey.default,
      tokenVaultProgram: PublicKey.default,
      auctionProgram: PublicKey.default,
      tokenMetadataProgram: PublicKey.default,
      tokenProgram: PublicKey.default,
      public: 0,
    });

    inst.accountPublicKey = PublicKey.default;

    itShouldDeserialize(Store, inst);
  });
});
