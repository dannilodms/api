import { expressHttpRouteAdapter } from '@/adapters/implementations/http/express/ExpressHttpRouteAdapter';
import CreateOrUpdatePedidoController from '@/controllers/pedido/CreateOrUpdatePedidoController';

const createOrUpdatePedidoController = new CreateOrUpdatePedidoController();
const createOrUpdatePedidoRouter = expressHttpRouteAdapter.adapt(createOrUpdatePedidoController);

export { createOrUpdatePedidoRouter };
