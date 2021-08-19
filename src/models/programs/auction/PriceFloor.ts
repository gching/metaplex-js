import BN from 'bn.js';
import { BorshSchema } from '../../utils/types';

export enum PriceFloorType {
  None = 0,
  Minimum = 1,
  BlindedPrice = 2,
}

export class PriceFloor {
  static SCHEMA: BorshSchema = new Map([
    [
      PriceFloor,
      {
        kind: 'struct',
        fields: [
          ['type', 'u8'],
          ['hash', [32]],
        ],
      },
    ],
  ]);

  type: PriceFloorType;
  // It's an array of 32 u8s, when minimum, only first 8 are used (a u64), when blinded price, the entire
  // thing is a hash and not actually a public key, and none is all zeroes
  hash: Uint8Array;

  minPrice?: BN;

  constructor(args: {
    type: PriceFloorType;
    hash?: Uint8Array;
    minPrice?: BN;
  }) {
    this.type = args.type;
    this.hash = args.hash || new Uint8Array(32);
    if (this.type === PriceFloorType.Minimum) {
      if (args.minPrice) {
        this.hash.set(args.minPrice.toArrayLike(Buffer, 'le', 8), 0);
      } else {
        this.minPrice = new BN(
          (args.hash || new Uint8Array(0)).slice(0, 8),
          'le',
        );
      }
    }
  }
}
