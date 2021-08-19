import { PublicKey } from '@solana/web3.js';
import { serialize } from 'borsh';
import { BorshSchema } from '../models/utils/types';

export function itShouldDeserialize<E>(
  cls: {
    SCHEMA: BorshSchema;
    // eslint-disable-next-line @typescript-eslint/ban-types
    decode: Function;
  },
  received: E,
  accountPubKey = PublicKey.default,
): void {
  const data = Buffer.from(serialize(cls.SCHEMA, received));

  const deserialized = cls.decode({
    pubkey: accountPubKey,
    account: {
      data,
    },
  }) as E;

  expect(deserialized).toDeepEqual(received);
}
