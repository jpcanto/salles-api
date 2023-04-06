import argon2 from 'argon2';

class Argon2Encryptor {
  private readonly memoryCost: number;
  private readonly timeCost: number;
  private readonly parallelism: number;

  constructor(memoryCost = 2 ** 16, timeCost = 4, parallelism = 1) {
    this.memoryCost = memoryCost;
    this.timeCost = timeCost;
    this.parallelism = parallelism;
  }

  async hash(password: string): Promise<string> {
    const hash = await argon2.hash(password, {
      memoryCost: this.memoryCost,
      timeCost: this.timeCost,
      parallelism: this.parallelism,
    });
    return hash;
  }

  async verify(password: string, hash: string): Promise<boolean> {
    const match = await argon2.verify(hash, password);
    return match;
  }
}

export default Argon2Encryptor;
