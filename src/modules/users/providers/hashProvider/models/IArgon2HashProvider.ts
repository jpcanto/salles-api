export interface IArgon2HashProvider {
  generateHash(password: string): Promise<string>;
  verifyHash(password: string, hash: string): Promise<Boolean>;
}
