import { Data } from '../Data';

describe('Data', () => {
  it('should instantiate with the correct values', () => {
    const inst = new Data({
      name: 'Hi',
      uri: 'wow',
      creators: [],
      sellerFeeBasisPoints: 100,
      symbol: 'DSD',
    });

    expect(inst).toMatchSnapshot();
  });
});
