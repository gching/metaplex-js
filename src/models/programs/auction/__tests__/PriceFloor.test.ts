import { PriceFloor, PriceFloorType } from '../PriceFloor';
import BN from 'bn.js';

describe('PriceFloor', () => {
  it('should instantiate with the correct values', () => {
    const priceFloor = new PriceFloor({
      type: PriceFloorType.Minimum,
      minPrice: new BN(0),
      hash: undefined,
    });

    expect(priceFloor).toMatchSnapshot();
  });
});
