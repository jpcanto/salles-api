import { container } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRespository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import '@modules/users/providers';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
