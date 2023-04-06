import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import * as argon2 from 'argon2';
import { defaultHashOptions } from '@shared/utils/argon2HashOptions';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const isUserExists = await usersRepository.findByEmail(email);

    if (isUserExists) {
      throw new AppError('There is already exists one user with this email');
    }

    const hashedPassword = await argon2.hash('password', defaultHashOptions());

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
