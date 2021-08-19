import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';
import { MasterEditionV2 } from '../MasterEditionV2';

describe('MasterEditionV2', () => {
  it('should instantiate with the correct values', () => {
    const inst = new MasterEditionV2({
      accountPublicKey: PublicKey.default,
      supply: new BN(0),
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new MasterEditionV2({
      accountPublicKey: PublicKey.default,
      supply: new BN(0),
    });

    itShouldDeserialize(MasterEditionV2, inst);
  });
});
