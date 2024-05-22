import Controller from '@/controllers/interfaces/Controller';

export default interface HttpRouteAdapter {
  adapt(controller: Controller): (req: any, res: any) => Promise<void>;
}
