import { isEqualWith } from 'lodash';
import BN from 'bn.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toDeepEqual: <E = any>(expected: E) => R;
    }
  }
}

expect.extend({
  toDeepEqual<E = any>(received: E, expected: E) {
    const pass = isEqualWith(received, expected, (objValue, otherValue) => {
      if (BN.isBN(objValue) && BN.isBN(otherValue)) {
        return objValue.eq(otherValue);
      }
      return undefined;
    });

    if (pass) {
      return {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        message: () => `expected ${received} not to deep equal ${expected}`,
        pass: true,
      };
    }

    return {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: () => `expected ${received} to deep equal ${expected}`,
      pass: false,
    };
  },
});

export default undefined;
