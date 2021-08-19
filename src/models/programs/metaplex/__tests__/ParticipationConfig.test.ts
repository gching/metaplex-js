import {
  NonWinningConstraint,
  ParticipationConfig,
  WinningConstraint,
} from '../ParticipationConfig';

describe('ParticipationConfig', () => {
  it('should instantiate with the correct values', () => {
    const inst = new ParticipationConfig({
      fixedPrice: undefined,
      nonWinningConstraint: NonWinningConstraint.GivenForFixedPrice,
      safetyDepositBoxIndex: 5,
      winnerConstraint: WinningConstraint.NoParticipationPrize,
    });

    expect(inst).toMatchSnapshot();
  });
});
