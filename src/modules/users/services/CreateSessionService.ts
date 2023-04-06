import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import Argon2Encryptor from '@shared/utils/argon2Encryptor';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const argon2 = new Argon2Encryptor();
    const passwordConfirmed = await argon2.verify(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, process.env.JWT_HASH!, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
