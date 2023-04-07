import { IArgon2HashProvider } from '../models/IArgon2HashProvider';

class MockArgon2HashProvider implements IArgon2HashProvider {
  public async generateHash(password: string): Promise<string> {
    return password;
  }

  public async verifyHash(password: string, hash: string): Promise<Boolean> {
    return password === hash;
  }
}

export default MockArgon2HashProvider;
