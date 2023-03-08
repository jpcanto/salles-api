import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { productIdMiddleware, productMiddleware } from './middlewareSchemas';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get(
  '/:id',
  productIdMiddleware.execute,
  productsController.show
);
productsRouter.post('/', productMiddleware.execute, productsController.create);
productsRouter.put(
  '/:id',
  productIdMiddleware.execute,
  productMiddleware.execute,
  productsController.update
);
productsRouter.delete(
  '/:id',
  productIdMiddleware.execute,
  productsController.delete
);

export default productsRouter;
