import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

routes.get('/health', (request, response) => {
  return response.json({
    message: 'ok',
  });
});

export default routes;
