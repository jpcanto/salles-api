import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IUser, IUserIn } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import { inject, injectable } from 'tsyringe';
import { IArgon2HashProvider } from '../providers/hashProvider/models/IArgon2HashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('Argon2HashProvider')
    private argon2HashProvider: IArgon2HashProvider
  ) {}

  public async execute({ name, email, password }: IUserIn): Promise<IUser> {
    const isUserExists = await this.usersRepository.findByEmail(email);
    if (isUserExists) {
      throw new AppError('There is already exists one user with this email');
    }

    const hashedPassword = await this.argon2HashProvider.generateHash(password);

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
