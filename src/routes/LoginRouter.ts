import LoginController from '@/controllers/login/LoginController';

import { expressHttpRouteAdapter } from '@/adapters/express/ExpressHttpRouteAdapter';

const loginController = new LoginController();
const route = expressHttpRouteAdapter.adapt(loginController);

export default route;
