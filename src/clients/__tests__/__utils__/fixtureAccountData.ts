import { BorshSchema } from '../../../models/utils/types';
import { serialize } from 'borsh';
import { AccountInfo, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

export function generateFixtureAccountData<
  E extends { accountPublicKey?: PublicKey },
>(
  schema: BorshSchema,
  inst: E,
  accountPubKey = PublicKey.default,
): {
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
} {
  const data = Buffer.from(serialize(schema, inst));

  return {
    pubkey: inst.accountPublicKey ?? accountPubKey,
    account: { data, owner: PublicKey.default, executable: false, lamports: 1 },
  };
}

export function generateFixtureAccountDataList<E>(
  schema: BorshSchema,
  allInstances: E[],
  accountPubKey = PublicKey.default,
): {
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
}[] {
  return allInstances.map((inst) =>
    generateFixtureAccountData(schema, inst, accountPubKey),
  );
}
