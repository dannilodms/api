import bcrypt from 'bcrypt';

import Hash from '@/adapters/interfaces/crypto/Hash';

const SALT_ROUNDS = 10;

export default class HashBcrypt implements Hash {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(text, salt);
  }
  async compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
