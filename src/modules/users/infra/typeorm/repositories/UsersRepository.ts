import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import User from '../entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRespository';
import { IUserIn } from '@modules/users/domain/models/IUser';

export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: IUserIn): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  public async remove(user: User): Promise<[]> {
    await this.ormRepository.save(user);
    return [];
  }

  public async find(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public createQueryBuilder(): SelectQueryBuilder<User> {
    return this.ormRepository.createQueryBuilder();
  }
}
