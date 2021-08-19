import {
  Blockhash,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';

export class TransactionsBuilder {
  #transactions: Transaction[] = [];

  get transactions(): Transaction[] {
    return [...this.#transactions];
  }

  addTransactionByInstructionsWithSigners(
    instructions: TransactionInstruction[],
    signers: Keypair[] = [],
  ): TransactionsBuilder {
    const transaction = new Transaction();

    transaction.add(...instructions);

    if (signers.length > 0) {
      transaction.partialSign(...signers);
    }

    this.#transactions.push(transaction);

    return this;
  }

  setBlockhash(blockhash: Blockhash): TransactionsBuilder {
    this.#transactions.forEach(
      (transaction) => (transaction.recentBlockhash = blockhash),
    );

    return this;
  }

  setFeePayer(feePayer: PublicKey): TransactionsBuilder {
    this.#transactions.forEach(
      (transaction) => (transaction.feePayer = feePayer),
    );

    return this;
  }
}
