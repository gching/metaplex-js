import { WinningConfig } from '../WinningConfig';

describe('WinningConfig', () => {
  it('should instantiate with the correct values', () => {
    const inst = new WinningConfig({
      items: [],
    });

    expect(inst).toMatchSnapshot();
  });
});
