import { describe, expect, test, vi } from 'vitest';

import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import ParseDTOResponse from '@/controllers/interfaces/ParseDTOResponse';
import { UserLogin, UserLoginParser } from '@/controllers/login/dto/UserLoginDTO';
import User from '@/models/User';
import ValidateUserAndGenerateJWT from '@/usecases/login/ValidateUserAndGenerateJWT';
// import LoginController from '@/controllers/login/LoginController';
import LoginController from './LoginController';

const makeFakeRequest = () => {
  return {
    body: {
      email: 'email@email.com',
      password: 'any_password'
    }
  } as HttpRequest;
};

const makeFakeUser = () =>
  ({
    id: 1,
    email: 'email@email.com',
    password: 'any_password'
  }) as User;

const makeSut = () => {
  const userLoginParserStub = {
    parse(userLoginObject: any): ParseDTOResponse<UserLogin> {
      return {
        isValid: true,
        data: {
          email: userLoginObject.email,
          password: userLoginObject.password
        } as UserLogin
      };
    }
  } as UserLoginParser;

  const validateUserAndGenerateJWTStub = {
    execute(email: string, password: string): Promise<string | null> {
      return Promise.resolve('token');
    }
  } as ValidateUserAndGenerateJWT;

  const loginController = new LoginController(userLoginParserStub, validateUserAndGenerateJWTStub);

  return {
    userLoginParserStub,
    validateUserAndGenerateJWTStub,
    sut: loginController
  };
};

describe('LoginController', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut, userLoginParserStub } = makeSut();
    vi.spyOn(userLoginParserStub, 'parse').mockReturnValueOnce({
      isValid: false,
      errors: ['E-mail inválido']
    });

    const request = makeFakeRequest();
    request.body.email = undefined;
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ message: ['E-mail inválido'] });
  });

  test('should return 400 if no password is provided', async () => {
    const { sut, userLoginParserStub } = makeSut();
    vi.spyOn(userLoginParserStub, 'parse').mockReturnValueOnce({
      isValid: false,
      errors: ['Senha inválida']
    });

    const request = makeFakeRequest();
    request.body.password = undefined;
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ message: ['Senha inválida'] });
  });

  test('should return 500 if UserLoginParser throws', async () => {
    const { sut, userLoginParserStub } = makeSut();
    const errorToThrow = new Error('Generic error');
    vi.spyOn(userLoginParserStub, 'parse').mockImplementationOnce(() => {
      throw errorToThrow;
    });
    const request = makeFakeRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual({ error: errorToThrow.message });
  });

  test('should call UserLoginParser with correct values', async () => {
    const { sut, userLoginParserStub } = makeSut();
    const parseSpy = vi.spyOn(userLoginParserStub, 'parse');
    const request = makeFakeRequest();
    await sut.handle(request);
    expect(parseSpy).toHaveBeenCalledWith(request.body);
  });

  test('should return 401 if dont validate credentials', async () => {
    const { sut, validateUserAndGenerateJWTStub } = makeSut();
    vi.spyOn(validateUserAndGenerateJWTStub, 'execute').mockResolvedValueOnce(null);
    const request = makeFakeRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual({ message: 'Usuário ou senha inválidos' });
  });

  test('should return 200 with token if valid credentials', async () => {
    const { sut, validateUserAndGenerateJWTStub } = makeSut();
    vi.spyOn(validateUserAndGenerateJWTStub, 'execute').mockResolvedValueOnce('token');
    const request = makeFakeRequest();
    const httpResponse = await sut.handle(request);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ token: 'token' });
  });
});
