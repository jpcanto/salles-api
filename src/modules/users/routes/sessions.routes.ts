import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { isSessionBodyValid } from '../middlewares/schema';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', isSessionBodyValid, sessionsController.create);

export default sessionsRouter;
