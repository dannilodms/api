import { Router } from 'express';

import loginRouter from './LoginRouter';
import { createOrUpdatePedidoRouter } from './PedidoRouter';

const router = Router();
router.post('/login', loginRouter);
router.get('/pedido/:filial/:pedido', createOrUpdatePedidoRouter);

export default router;
