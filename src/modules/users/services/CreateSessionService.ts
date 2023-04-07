import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth';
import Argon2Encryptor from '@shared/utils/argon2Encryptor';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import { ISessionIn, ISessionOut } from '../domain/models/ISession';


@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ email, password }: ISessionIn): Promise<ISessionOut> {
    const user = await this.usersRepository.findByEmail(email);
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
        user: user,
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
