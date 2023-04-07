import { SelectQueryBuilder } from 'typeorm';
import { IUser, IUserIn } from '../models/IUser';

export interface IUserRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: IUserIn): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<[]>;
  find(): Promise<IUser[]>;
  createQueryBuilder(): SelectQueryBuilder<IUser>;
}
