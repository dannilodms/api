import { describe, expect, test } from 'vitest';
import JWTGeneratorJsonWebToken from './JWTGeneratorJsonWebToken';

const makeSut = () => {
  const secret = 'any_secret';
  const sut = new JWTGeneratorJsonWebToken(secret);
  return { sut, secret };
};

const makeFakeUser = () => {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  };
};

describe('JWTGeneratorJsonWebToken', () => {
  test('should return token', async () => {
    const { sut } = makeSut();
    const user = makeFakeUser();

    const token = await sut.generate(user);
    expect(token).toBeTypeOf('string');
  });

  test('should return true if compare is true', async () => {
    const { sut } = makeSut();
    const user = makeFakeUser();
    const token = await sut.generate(user);
    const result = await sut.verify(token);
    expect(result).toBe(true);
  });

  test('should return false if compare is false', async () => {
    const { sut } = makeSut();
    const token = 'any_token';
    const result = await sut.verify(token);
    expect(result).toBe(false);
  });
});
