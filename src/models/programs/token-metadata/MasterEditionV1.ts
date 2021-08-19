import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { deserializeUnchecked } from 'borsh';
import { BorshSchema } from '../../utils/types';
import { MetadataKey } from './MetadataKey';
import { AccountWithPublicKey } from '../../../utils/privateTypes';

export class MasterEditionV1 {
  static SCHEMA: BorshSchema = new Map([
    [
      MasterEditionV1,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['supply', 'u64'],
          ['maxSupply', { kind: 'option', type: 'u64' }],
          ['printingMint', 'pubkey'],
          ['oneTimePrintingAuthorizationMint', 'pubkey'],
        ],
      },
    ],
  ]);

  key = MetadataKey.MasterEditionV1;
  accountPublicKey?: PublicKey;
  supply: BN;
  maxSupply?: BN;
  /// Can be used to mint tokens that give one-time permission to mint a single limited edition.
  printingMint: PublicKey;
  /// If you don't know how many printing tokens you are going to need, but you do know
  /// you are going to need some amount in the future, you can use a token from this mint.
  /// Coming back to token metadata with one of these tokens allows you to mint (one time)
  /// any number of printing tokens you want. This is used for instance by Auction Manager
  /// with participation NFTs, where we dont know how many people will bid and need participation
  /// printing tokens to redeem, so we give it ONE of these tokens to use after the auction is over,
  /// because when the auction begins we just dont know how many printing tokens we will need,
  /// but at the end we will. At the end it then burns this token with token-metadata to
  /// get the printing tokens it needs to give to bidders. Each bidder then redeems a printing token
  /// to get their limited editions.
  oneTimePrintingAuthorizationMint: PublicKey;

  constructor(args: Omit<MasterEditionV1, 'key'>) {
    this.accountPublicKey = args.accountPublicKey;
    this.supply = args.supply;
    this.maxSupply = args.maxSupply;
    this.printingMint = args.printingMint;
    this.oneTimePrintingAuthorizationMint =
      args.oneTimePrintingAuthorizationMint;
  }

  static decode(accountWithPublicKey: AccountWithPublicKey): MasterEditionV1 {
    const masterEdition = deserializeUnchecked(
      MasterEditionV1.SCHEMA,
      MasterEditionV1,
      accountWithPublicKey.account.data,
    ) as MasterEditionV1;

    return new MasterEditionV1({
      ...masterEdition,
      accountPublicKey: accountWithPublicKey.pubkey,
    });
  }
}
