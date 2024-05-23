export default interface JWTGenerator {
  generate<T extends object | string>(payload: T): Promise<string>;
  verify(token: string): Promise<Boolean>;
}
