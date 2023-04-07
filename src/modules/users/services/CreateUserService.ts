import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import Argon2Encryptor from '@shared/utils/argon2Encryptor';
import RedisCache from '@shared/cache/RedisCache';

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

    const argon = new Argon2Encryptor();
    const hashedPassword = await argon.hash(password);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await RedisCache.invalidate('users');

    await usersRepository.save(user);

    return user.userOut();
  }
}

export default CreateUserService;
