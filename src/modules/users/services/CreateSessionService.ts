import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRespository';
import { ISessionIn, ISessionOut } from '../domain/models/ISession';
import { IArgon2HashProvider } from '../providers/hashProvider/models/IArgon2HashProvider';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('Argon2HashProvider')
    private argon2HashProvider: IArgon2HashProvider
  ) {}

  public async execute({ email, password }: ISessionIn): Promise<ISessionOut> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await this.argon2HashProvider.verifyHash(
      password,
      user.password
    );

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
