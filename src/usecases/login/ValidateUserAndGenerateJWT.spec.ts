import { describe, expect, test, vi } from 'vitest';

import HashGenerator from '@/adapters/interfaces/crypto/HashGenerator';
import JWTGenerator from '@/adapters/interfaces/crypto/JWTGenerator';
import UserRepository from '@/data/repositories/interfaces/UserRepository';
import User from '@/models/User';
import ValidateUserAndGenerateJWT from './ValidateUserAndGenerateJWT';

const makeFakeUser = () =>
  ({
    id: 1,
    email: 'email@email.com',
    password: 'any_password'
  }) as User;

const makeSut = () => {
  const userRepository = {
    async getUserByEmail(email: string): Promise<User | null> {
      return makeFakeUser();
    }
  } as UserRepository;

  const hashGenerator = {
    hash(text: string): Promise<string> {
      return Promise.resolve('hash');
    },

    compare(text: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  } as HashGenerator;

  const jwtGenerator = {
    generate<T extends object | string>(payload: T): Promise<string> {
      return Promise.resolve('token');
    },

    verify(token: string): Promise<Boolean> {
      return Promise.resolve(true);
    }
  } as JWTGenerator;

  const sut = new ValidateUserAndGenerateJWT(userRepository, hashGenerator, jwtGenerator);
  return {
    userRepository,
    hashGenerator,
    jwtGenerator,
    sut
  };
};

describe('ValidateUserAndGenerateJWT', () => {
  test('should return null if user is not found', async () => {
    const { sut, userRepository } = makeSut();
    vi.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(null);

    const user = makeFakeUser();
    const token = await sut.execute(user.email, user.password);
    expect(token).toBe(null);
  });

  test('should return null if password is invalid', async () => {
    const { sut, hashGenerator } = makeSut();
    vi.spyOn(hashGenerator, 'compare').mockResolvedValueOnce(false);

    const user = makeFakeUser();
    const token = await sut.execute(user.email, user.password);
    expect(token).toBe(null);
  });

  test('should return token if user and password are valid', async () => {
    const { sut, jwtGenerator } = makeSut();
    vi.spyOn(jwtGenerator, 'generate').mockResolvedValueOnce('token');
    const user = makeFakeUser();
    const token = await sut.execute(user.email, user.password);
    expect(token).toBeTypeOf('string');
    expect(jwtGenerator.generate).toHaveBeenCalledWith(user);
  });
});
