import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../entities/Product';
import { ProductRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOneBy(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
