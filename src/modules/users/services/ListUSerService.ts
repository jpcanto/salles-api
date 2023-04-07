import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IPaginationUser {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[];
}

class ListUserService {
  public async getAll(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const redisCache = new RedisCache();

    let users = await redisCache.recover<User[]>('users');

    if (!users) {
      users = await usersRepository.find();

      await redisCache.save('users', users);
    }

    return users;
  }

  public async getPaginated(): Promise<IPaginationUser> {
    const usersRepository = getCustomRepository(UsersRepository);

    const paginationResult = await usersRepository
      .createQueryBuilder()
      .paginate();
    const users = paginationResult.data.map((user: User) => user.userOut());

    paginationResult.data = users;

    return paginationResult as IPaginationUser;
  }
}

export default ListUserService;
