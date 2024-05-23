import { Request, Response } from 'express';

import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import HttpRouteAdapter from '@/adapters/interfaces/http/HttpRouteAdapter';
import Controller from '@/controllers/interfaces/Controller';

class ExpressHttpRouteAdapter implements HttpRouteAdapter {
  requestAdapter(req: Request): HttpRequest {
    return {
      body: req.body ?? undefined,
      params: req.params ?? undefined,
      query: req.query ?? undefined,
      headers: req.headers ?? undefined
    };
  }

  adapt(controller: Controller): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = this.requestAdapter(req);
      const httpResponse = await controller.handle(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}

const expressHttpRouteAdapter = new ExpressHttpRouteAdapter();
export { expressHttpRouteAdapter };
