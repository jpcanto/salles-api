import crypto from 'crypto';
import { IEncryptorProvider } from '../models/IEncryptorProvider';

export class Encryptor implements IEncryptorProvider {
  private readonly algorithm: string;
  private readonly iv: string;
  private readonly key: string;

  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.iv = '0123456789abcdef';
    this.key = process.env.CRYPTO_HASH!;
  }

  public encrypt(data: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(`encrypted: ${encrypted}`);
    return encrypted;
  }

  public decrypt(data: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export default Encryptor;
