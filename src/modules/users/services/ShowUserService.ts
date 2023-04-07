import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowUserService;
