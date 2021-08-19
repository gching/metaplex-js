import { WinningConfigStateItem } from '../WinningConfigStateItem';

describe('WinningConfigStateItem', () => {
  it('should instantiate with the correct values', () => {
    const inst = new WinningConfigStateItem();

    expect(inst).toMatchSnapshot();
  });
});
