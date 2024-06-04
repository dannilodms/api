import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import HttpResponse from '@/adapters/interfaces/http/HttpResponse';

import { ok, unauthorized } from '@/helpers/HttpHelpers';
import Controller from '../interfaces/Controller';

export default class CreateOrUpdatePedidoController implements Controller {
  async handle(req: HttpRequest): Promise<HttpResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    if (req.headers?.authorization !== 'api-homolog') return unauthorized('Token de autorização inválido');
    return ok(`Pedido ${req?.params?.pedido} filial ${req?.params?.filial} atualizado com sucesso!`);
  }
}
