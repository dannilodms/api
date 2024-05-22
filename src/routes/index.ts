import { Router } from 'express';

import loginRouter from './LoginRouter';

const router = Router();
router.post('/login', loginRouter);

export default router;
