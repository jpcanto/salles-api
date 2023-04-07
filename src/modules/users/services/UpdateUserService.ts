import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

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

    await usersRepository.save(user);

    return user.userOut();
  }
}

export default UpdateUserService;
