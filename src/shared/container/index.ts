import { container } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRespository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
