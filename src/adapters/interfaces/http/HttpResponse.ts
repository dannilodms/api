export default interface HttpResponse<T = any> {
  statusCode: number;
  body?: T;
}
