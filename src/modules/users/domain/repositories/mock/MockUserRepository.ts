import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRespository';
import { IUserIn } from '@modules/users/domain/models/IUser';

export class MockUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async create({ name, email, password }: IUserIn): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;
    user.created_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);

    return user;
  }

  public async remove(user: User): Promise<[]> {
    return [];
  }

  public async find(): Promise<User[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(u => u.name === name);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(u => u.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);

    return user;
  }

  public createQueryBuilder(): any {
    return {
      to: 8,
      per_page: 15,
      total: 8,
      current_page: 1,
      prev_page: null,
      next_page: null,
      last_page: 1,
      data: this.users,
    };
  }
}
