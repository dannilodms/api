import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import HttpResponse from '@/adapters/interfaces/http/HttpResponse';

import { ok } from '@/helpers/HttpHelpers';
import Controller from '../interfaces/Controller';

export default class CreateOrUpdatePedidoController implements Controller {
  async handle(req: HttpRequest): Promise<HttpResponse<any>> {
    console.log(req.headers);
    await new Promise(resolve => setTimeout(resolve, 1200));
    return ok(`Pedido ${req?.params?.pedido} filial ${req?.params?.filial} atualizado com sucesso!`);
  }
}
