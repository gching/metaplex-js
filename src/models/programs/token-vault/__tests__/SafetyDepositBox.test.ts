import { PublicKey } from '@solana/web3.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';
import { SafetyDepositBox } from '../SafetyDepositBox';

describe('SafetyDepositBox', () => {
  it('should instantiate with the correct values', () => {
    const inst = new SafetyDepositBox({
      accountPublicKey: PublicKey.default,
      vault: PublicKey.default,
      store: PublicKey.default,
      order: 5,
      tokenMint: PublicKey.default,
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new SafetyDepositBox({
      accountPublicKey: PublicKey.default,
      vault: PublicKey.default,
      store: PublicKey.default,
      order: 5,
      tokenMint: PublicKey.default,
    });

    itShouldDeserialize(SafetyDepositBox, inst);
  });
});
