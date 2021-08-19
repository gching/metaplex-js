import { PublicKey } from '@solana/web3.js';
import { Edition } from '../Edition';
import BN from 'bn.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';

describe('Edition', () => {
  it('should instantiate with the correct values', () => {
    const inst = new Edition({
      accountPublicKey: PublicKey.default,
      edition: new BN(0),
      parent: PublicKey.default,
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new Edition({
      accountPublicKey: PublicKey.default,
      edition: new BN(0),
      parent: PublicKey.default,
    });

    inst.accountPublicKey = PublicKey.default;

    itShouldDeserialize(Edition, inst);
  });
});
