import User from '../infra/typeorm/entities/User';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import { IPaginationUser } from '../domain/models/IUser';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async getAll(): Promise<User[]> {
    let users = await RedisCache.recover<User[]>('users');

    if (!users) {
      users = await this.usersRepository.find();

      await RedisCache.save('users', users);
    }

    return users;
  }

  public async getPaginated(): Promise<IPaginationUser> {
    const paginationResult = await this.usersRepository
      .createQueryBuilder()
      .paginate();

    return paginationResult as IPaginationUser;
  }
}

export default ListUserService;
