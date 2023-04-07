import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

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
  public async execute(): Promise<IPaginationUser> {
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
