import HttpResponse from '@/adapters/interfaces/http/HttpResponse';

export function ok<T>(body: T | undefined): HttpResponse {
  return {
    statusCode: 200,
    body
  } as HttpResponse;
}

export function created<T>(body: T | undefined): HttpResponse {
  return {
    statusCode: 201,
    body
  } as HttpResponse;
}

export function noContent(): HttpResponse {
  return {
    statusCode: 204,
    body: undefined
  } as HttpResponse;
}

export function badRequest(error: string[] | string | object): HttpResponse {
  return {
    statusCode: 400,
    body: error
  } as HttpResponse;
}

export function unauthorized(error: string[] | string | object): HttpResponse {
  return {
    statusCode: 401,
    body: error
  } as HttpResponse;
}

export function forbidden(error: string[] | string | object): HttpResponse {
  return {
    statusCode: 403,
    body: error
  } as HttpResponse;
}

export function notFound(error: string[] | string | object): HttpResponse {
  return {
    statusCode: 404,
    body: error
  } as HttpResponse;
}

export function serverError(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: { error: error.message || error }
  } as HttpResponse;
}
