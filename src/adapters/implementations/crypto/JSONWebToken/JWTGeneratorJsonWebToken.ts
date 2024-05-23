import jwt from 'jsonwebtoken';

import JWTGenerator from '@/adapters/interfaces/crypto/JWTGenerator';

export default class JWTGeneratorJsonWebToken implements JWTGenerator {
  constructor(private readonly secret: string) {}

  generate<T extends object | string>(payload: T): Promise<string> {
    return new Promise((resolve, reject) =>
      jwt.sign(payload, this.secret, { expiresIn: '1d' }, (err, token) => {
        if (err) return reject(err);
        if (token) return resolve(token);
        return reject(new Error('Error generating token'));
      })
    );
  }

  async verify(token: string): Promise<Boolean> {
    try {
      const result = await new Promise((resolve, reject) =>
        jwt.verify(token, this.secret, (err, decoded) => {
          if (err) return reject(false);
          if (decoded) return resolve(true);
          return reject(false);
        })
      );
      return !!result;
    } catch (error) {
      return false;
    }
  }
}
