/* eslint-disable @typescript-eslint/unbound-method */
import { TransactionsBuilder } from '../TransactionsBuilder';
import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
jest.mock('@solana/web3.js');

const MockTransaction = Transaction as jest.MockedClass<typeof Transaction>;

describe('TransactionsBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('transactions', () => {
    it('should return empty transactions on instantiation', () => {
      const builder = new TransactionsBuilder();
      expect(builder.transactions).toEqual([]);
    });

    it('should return a copy of the transactions everytime', () => {
      const builder = new TransactionsBuilder();
      builder.addTransactionByInstructionsWithSigners([]);

      const currTransactions = builder.transactions;

      // Call again
      expect(builder.transactions).not.toBe(currTransactions);
      expect(builder.transactions).toEqual(currTransactions);
    });
  });

  describe('addTransactionByInstructionsWithSigners', () => {
    it('should return itself', () => {
      const builder = new TransactionsBuilder();

      const returned = builder.addTransactionByInstructionsWithSigners([]);

      expect(returned).toBe(builder);
    });

    it('should add a transaction to the list of transactions', () => {
      const builder = new TransactionsBuilder();

      builder.addTransactionByInstructionsWithSigners([]);

      expect(builder.transactions).toHaveLength(1);
      expect(MockTransaction).toHaveBeenCalledTimes(1);
      expect(builder.transactions[0]).toBe(MockTransaction.mock.instances[0]);
    });

    it('should add a new transaction with the instructions', () => {
      const builder = new TransactionsBuilder();

      const instructions = [
        new TransactionInstruction({
          keys: [],
          programId: PublicKey.default,
        }),
      ];

      builder.addTransactionByInstructionsWithSigners(instructions);

      expect(MockTransaction.prototype.add).toHaveBeenCalledTimes(1);
      expect(MockTransaction.prototype.add).toHaveBeenCalledWith(
        ...instructions,
      );
    });

    it('should add a new transaction that is partially signed with signers', () => {
      const builder = new TransactionsBuilder();
      const signers = [new Keypair()];

      builder.addTransactionByInstructionsWithSigners([], signers);

      expect(MockTransaction.prototype.partialSign).toHaveBeenCalledTimes(1);
      expect(MockTransaction.prototype.partialSign).toHaveBeenCalledWith(
        ...signers,
      );
    });
  });

  it('should set the blockhash on transactions', () => {
    const builder = new TransactionsBuilder();
    builder.addTransactionByInstructionsWithSigners([]);

    const blockHash = '123';

    const results = builder.setBlockhash(blockHash);

    expect(results).toBe(builder);
    expect(builder.transactions[0].recentBlockhash).toBe(blockHash);
  });

  it('should set the fee payer on transactions', () => {
    const builder = new TransactionsBuilder();
    builder.addTransactionByInstructionsWithSigners([]);

    const feePayer = PublicKey.default;

    const results = builder.setFeePayer(feePayer);

    expect(results).toBe(builder);
    expect(builder.transactions[0].feePayer).toBe(feePayer);
  });
});
