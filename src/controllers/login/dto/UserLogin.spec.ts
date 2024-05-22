import { describe, expect, test } from 'vitest';
import UserLoginParserImpl from './UserLogin';

const makeSut = () => {
  const sut = new UserLoginParserImpl();
  return { sut };
};

const makeFakeUser = () => {
  return {
    email: 'email@email.com',
    password: 'any_password'
  };
};

describe('UserLogin', () => {
  test('should return success false "Senha inválida" if password is empty', () => {
    const { sut } = makeSut();
    const user = makeFakeUser();
    user.password = '';
    const result = sut.parse(user);
    expect(result.isValid).toBe(false);
    expect(!result.isValid && result.errors).toEqual(['Senha inválida']);
  });

  test('should return success false "E-mail inválido" if email is empty', () => {
    const { sut } = makeSut();
    const user = makeFakeUser();
    user.email = '';
    const result = sut.parse(user);
    expect(result.isValid).toBe(false);
    expect(!result.isValid && result.errors).toEqual(['E-mail inválido']);
  });

  test('should return success false "E-mail inválido" if email is not valid', () => {
    const { sut } = makeSut();
    const user = makeFakeUser();
    user.email = 'notvalida@email';
    const result = sut.parse(user);
    expect(result.isValid).toBe(false);
    expect(!result.isValid && result.errors).toEqual(['E-mail inválido']);
  });

  test('should return success true if user is valid', () => {
    const { sut } = makeSut();
    const user = makeFakeUser();
    const result = sut.parse(user);
    expect(result.isValid).toBe(true);
    expect(result.isValid && result.data).toEqual({
      email: user.email,
      password: user.password
    });
  });
});
