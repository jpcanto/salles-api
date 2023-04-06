import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../middlewares/isAuthenticated';
import { usersIdMiddleware, usersBodyMiddleware } from './router.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get(
  '/:id',
  isAuthenticated,
  usersIdMiddleware.execute,
  usersController.show
);

usersRouter.post('/', usersBodyMiddleware.execute, usersController.create);

usersRouter.put(
  '/:id',
  isAuthenticated,
  usersIdMiddleware.execute,
  usersBodyMiddleware.execute,
  usersController.update
);

usersRouter.delete(
  '/:id',
  isAuthenticated,
  usersIdMiddleware.execute,
  usersController.delete
);

export default usersRouter;
