import AppError from '@shared/errors/AppError';
import Argon2Encryptor from '@shared/utils/argon2Encryptor';
import RedisCache from '@shared/cache/RedisCache';
import { IUser, IUserIn } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ name, email, password }: IUserIn): Promise<IUser> {
    const isUserExists = await this.usersRepository.findByEmail(email);

    if (isUserExists) {
      throw new AppError('There is already exists one user with this email');
    }

    const argon = new Argon2Encryptor();
    const hashedPassword = await argon.hash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await RedisCache.invalidate('users');

    return user;
  }
}

export default CreateUserService;
