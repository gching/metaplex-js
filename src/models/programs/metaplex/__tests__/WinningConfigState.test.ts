import { WinningConfigState } from '../WinningConfigState';

describe('WinningConfigState', () => {
  it('should instantiate with the correct values', () => {
    const inst = new WinningConfigState();

    expect(inst).toMatchSnapshot();
  });
});
