import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const isUserExists = await usersRepository.findByEmail(email);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('user not found.');
    }

    if (isUserExists && email !== user.email) {
      throw new AppError('There is already exists one user with this email');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await RedisCache.invalidate('users');
    await usersRepository.save(user);

    return user.userOut();
  }
}

export default UpdateUserService;
