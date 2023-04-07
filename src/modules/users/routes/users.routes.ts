import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import { isUserIdValid, isUSerBodyValid } from '../middlewares/schema';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get('/:id', isAuthenticated, usersController.show);

usersRouter.post('/', isUSerBodyValid, usersController.create);

usersRouter.put(
  '/:id',
  isAuthenticated,
  isUserIdValid,
  isUSerBodyValid,
  usersController.update
);

usersRouter.delete(
  '/:id',
  isAuthenticated,
  isUserIdValid,
  usersController.delete
);

export default usersRouter;
