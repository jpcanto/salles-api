import { MockUsersRepository } from '@modules/users/domain/repositories/mock/MockUserRepository';
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
});