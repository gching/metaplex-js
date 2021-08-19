import { WinningConfigItem, WinningConfigType } from '../WinningConfigItem';

describe('WinningConfigItem', () => {
  it('should instantiate with the correct values', () => {
    const inst = new WinningConfigItem({
      amount: 0,
      safetyDepositBoxIndex: 0,
      winningConfigType: WinningConfigType.TokenOnlyTransfer,
    });

    expect(inst).toMatchSnapshot();
  });
});
