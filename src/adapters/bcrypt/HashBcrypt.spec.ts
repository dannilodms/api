import { describe, expect, test } from 'vitest';

import HashBcrypt from './HashBcrypt';

describe('HashBcrypt', () => {
  test('should return hash', async () => {
    const sut = new HashBcrypt();
    const hash = await sut.hash('any_password');
    expect(hash).toBeTypeOf('string');
  });

  test('should return true if compare is true', async () => {
    const sut = new HashBcrypt();
    const hash = await sut.hash('any_password');
    const result = await sut.compare('any_password', hash);
    expect(result).toBe(true);
  });
});
