import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';
import { MasterEditionV1 } from '../MasterEditionV1';

describe('MasterEditionV1', () => {
  it('should instantiate with the correct values', () => {
    const inst = new MasterEditionV1({
      accountPublicKey: PublicKey.default,
      oneTimePrintingAuthorizationMint: PublicKey.default,
      supply: new BN(0),
      printingMint: PublicKey.default,
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new MasterEditionV1({
      accountPublicKey: PublicKey.default,
      oneTimePrintingAuthorizationMint: PublicKey.default,
      supply: new BN(0),
      printingMint: PublicKey.default,
    });

    itShouldDeserialize(MasterEditionV1, inst);
  });
});
