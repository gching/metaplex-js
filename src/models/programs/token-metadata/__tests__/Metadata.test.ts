import { PublicKey } from '@solana/web3.js';
import { itShouldDeserialize } from '../../../../test-utils/itShouldDeserialize';
import { Metadata } from '../Metadata';
import { Data } from '../Data';

describe('Metadata', () => {
  it('should instantiate with the correct values', () => {
    const inst = new Metadata({
      accountPublicKey: PublicKey.default,
      updateAuthority: PublicKey.default,
      data: new Data({
        uri: '1',
        sellerFeeBasisPoints: 0,
        name: 'test',
        symbol: 'test',
        creators: [],
      }),
      mint: PublicKey.default,
      isMutable: 0,
      primarySaleHappened: 1,
    });

    expect(inst).toMatchSnapshot();
  });

  it('should deserialize with the correct values', () => {
    const inst = new Metadata({
      accountPublicKey: PublicKey.default,
      updateAuthority: PublicKey.default,
      data: new Data({
        uri: '1',
        sellerFeeBasisPoints: 0,
        name: 'test',
        symbol: 'test',
        creators: [],
      }),
      mint: PublicKey.default,
      isMutable: 0,
      primarySaleHappened: 1,
    });

    itShouldDeserialize(Metadata, inst);
  });
});
