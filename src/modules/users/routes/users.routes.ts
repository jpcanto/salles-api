import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { usersIdMiddleware, usersBodyMiddleware } from './users.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.get('/:id', usersIdMiddleware.execute, usersController.show);

usersRouter.post('/', usersBodyMiddleware.execute, usersController.create);

usersRouter.put('/:id', usersIdMiddleware.execute, usersBodyMiddleware.execute, usersController.update);

usersRouter.delete('/:id', usersIdMiddleware.execute, usersController.delete);

export default usersRouter;
