import { serialize } from 'borsh';
import { BorshSchema } from '../../utils/types';

export class SetWhitelistedCreatorArgs {
  static SCHEMA: BorshSchema = new Map([
    [
      SetWhitelistedCreatorArgs,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['activated', 'u8'], //bool
        ],
      },
    ],
  ]);

  instruction = 9;
  activated: boolean;
  constructor(args: { activated: boolean }) {
    this.activated = args.activated;
  }

  encode(): Buffer {
    return Buffer.from(serialize(SetWhitelistedCreatorArgs.SCHEMA, this));
  }
}
