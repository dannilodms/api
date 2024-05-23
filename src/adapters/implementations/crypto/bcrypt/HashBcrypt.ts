import bcrypt from 'bcrypt';

import HashGenerator from '@/adapters/interfaces/crypto/HashGenerator';

const SALT_ROUNDS = 10;

export default class HashBcrypt implements HashGenerator {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(text, salt);
  }
  async compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
