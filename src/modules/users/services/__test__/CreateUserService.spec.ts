import { MockUsersRepository } from '@modules/users/domain/repositories/mock/MockUserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create new user', async () => {
    const repository = new MockUsersRepository();
    const createUser = new CreateUserService(repository);
    const user = await createUser.execute({
      name: 'Developer test',
      email: 'Developer@developer.com',
      password: 'Dev123',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create two users with the same email', async () => {
    const repository = new MockUsersRepository();
    const createUser = new CreateUserService(repository);
    await createUser.execute({
      name: 'Developer test',
      email: 'Developer@developer.com',
      password: 'Dev123',
    });

    expect(
      createUser.execute({
        name: 'Developer test',
        email: 'Developer@developer.com',
        password: 'Dev123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
