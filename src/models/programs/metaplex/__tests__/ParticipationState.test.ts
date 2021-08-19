import { ParticipationState } from '../ParticipationState';
import BN from 'bn.js';

describe('ParticipationState', () => {
  it('should instantiate with the correct values', () => {
    const inst = new ParticipationState({
      primarySaleHappened: 0,
      validated: 1,
      collectedToAcceptPayment: new BN(0),
    });

    expect(inst).toMatchSnapshot();
  });
});
