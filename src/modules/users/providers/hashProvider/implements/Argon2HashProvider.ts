import argon2 from 'argon2';
import { IArgon2HashProvider } from '@modules/users/providers/hashProvider/models/IArgon2HashProvider';

class Argon2HashProvider implements IArgon2HashProvider {
  public async generateHash(password: string): Promise<string> {
    const hash = await argon2.hash(password, {
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 1,
    });
    return hash;
  }

  public async verifyHash(password: string, hash: string): Promise<Boolean> {
    const match = await argon2.verify(hash, password);
    return match;
  }
}

export default Argon2HashProvider;
