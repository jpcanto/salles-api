import crypto from 'crypto';

export class Encryptor {
  private readonly algorithm: string = 'aes-256-cbc';
  private readonly iv: string = '0123456789abcdef';
  private readonly key: string;

  constructor(key: string = '62f2e31a707f522d9ef0578fffafe9ac') {
    this.key = key;
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
