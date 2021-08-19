import { serialize } from 'borsh';
import { BorshSchema } from '../../utils/types';

export class SetStoreArgs {
  static SCHEMA: BorshSchema = new Map([
    [
      SetStoreArgs,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['public', 'u8'], //bool
        ],
      },
    ],
  ]);

  instruction = 8;
  public: boolean;
  constructor(args: { public: boolean }) {
    this.public = args.public;
  }

  encode(): Buffer {
    return Buffer.from(serialize(SetStoreArgs.SCHEMA, this));
  }
}
