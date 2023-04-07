import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
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

    try {
      const token = sign({}, authConfig.jwt.secret!, {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      });

      return {
        user: user.userOut(),
        token,
      };
    } catch (error) {
      throw new AppError(
        'Somenthing went wrong trying to generate jwt token',
        500
      );
    }
  }
}

export default CreateSessionService;
