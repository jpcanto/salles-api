import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/health', (request, response) => {
  return response.json({
    message: 'ok',
  });
});

export default routes;
