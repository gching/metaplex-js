import { PublicKey } from '@solana/web3.js';
import { BinaryReader, BinaryWriter } from 'borsh';

class SerializablePublicKey extends PublicKey {
  borshSerialize(writer: BinaryWriter) {
    writer.writeFixedArray(this.toBuffer());
  }

  static borshDeserialize(reader: BinaryReader): SerializablePublicKey {
    const array = reader.readFixedArray(32);
    return new SerializablePublicKey(array);
  }
}
