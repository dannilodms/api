import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import HttpResponse from '@/adapters/interfaces/http/HttpResponse';

export default interface Controller {
  handle(req: HttpRequest): Promise<HttpResponse>;
}
