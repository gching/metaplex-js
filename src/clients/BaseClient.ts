import {
  Connection,
  PublicKey,
  sendAndConfirmRawTransaction,
  TransactionSignature,
} from '@solana/web3.js';
import { TransactionsBuilder } from '../builders/TransactionsBuilder';
import { OnSignTransactions } from '../utils/publicTypes';
import { ProgramPublicKeyIds } from '../utils/privateTypes';

/**
 * Constructor parameters for {@link BaseClient}
 * @internal
 */
export interface ClientConstructorParams {
  /**
   * Connection instance to talk with Solana.
   * @internal
   */
  connection: Connection;
  /**
   * All program IDs to interact with on Metaplex.
   * @internal
   */
  programIds: ProgramPublicKeyIds;
  /**
   * Optional function to be called if needed when signing of transactions is required.
   * @internal
   */
  onSignTransactions?: OnSignTransactions;
}

/**
 * Superclass for all clients that interact with Metaplex.
 */
export class BaseClient {
  /**
   * Connection instance to talk with Solana.
   * @protected
   */
  protected readonly connection: Connection;
  /**
   * All program IDs to interact with on Metaplex.
   * @protected
   */
  protected readonly programIds: ProgramPublicKeyIds;
  /**
   * Optional function to be called if needed when signing of transactions is required.
   * @protected
   */
  protected readonly onSignTransactions?: OnSignTransactions;

  /**
   * Instantiate the client.
   * @internal
   */
  constructor(options: ClientConstructorParams) {
    this.connection = options.connection;
    this.programIds = options.programIds;
    this.onSignTransactions = options.onSignTransactions;
  }

  /**
   * Builds and sends a executes a list of transactions.
   * @param feePayer - The fee payer of the transactions.
   * @param builder - The builder to build the transactions
   * @returns A list of transaction signatures of the executed transactions.
   * @protected
   */
  protected async sendTransactions(
    feePayer: PublicKey,
    builder: TransactionsBuilder,
  ): Promise<TransactionSignature[]> {
    // Get the recent blockhash, set the blockhash and fee payer.
    const block = await this.connection.getRecentBlockhash('singleGossip');
    builder.setBlockhash(block.blockhash).setFeePayer(feePayer);

    // Fetch all the transactions.
    const transactions = builder.transactions;

    // Sign the transactions.
    if (this.onSignTransactions == null) {
      throw new Error();
    }

    const signedTransactions = await this.onSignTransactions(transactions);

    // Now serialize and send all the transactions individually.
    const rawTransactions = signedTransactions.map((transaction) =>
      transaction.serialize(),
    );

    const signatures: TransactionSignature[] = [];

    for (const rawTransaction of rawTransactions) {
      const signature = await sendAndConfirmRawTransaction(
        this.connection,
        rawTransaction,
        { skipPreflight: true },
      );

      signatures.push(signature);
    }

    return signatures;
  }
}
