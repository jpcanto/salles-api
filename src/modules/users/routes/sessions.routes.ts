import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { sessionsBodyMiddleware } from './router.middleware';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  sessionsBodyMiddleware.execute,
  sessionsController.create
);

export default sessionsRouter;
