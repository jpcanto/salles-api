import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import { IUpdateUserIn } from '../domain/models/IUser';


@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ id, name, email, password }: IUpdateUserIn): Promise<User> {
    const isUserExists = await this.usersRepository.findByEmail(email);

    const user = await this.usersRepository.findById(id);

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
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
