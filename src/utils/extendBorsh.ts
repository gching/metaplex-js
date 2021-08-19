import { BinaryReader, BinaryWriter } from 'borsh';
import { PublicKey } from '@solana/web3.js';

const extendBorsh = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (BinaryReader.prototype as any).readPubkey = function () {
    const reader = this as unknown as BinaryReader;
    const array = reader.readFixedArray(32);
    return new PublicKey(array);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (BinaryWriter.prototype as any).writePubkey = function (value: PublicKey) {
    const writer = this as unknown as BinaryWriter;
    writer.writeFixedArray(value.toBuffer());
  };
};

extendBorsh();

export default undefined;
