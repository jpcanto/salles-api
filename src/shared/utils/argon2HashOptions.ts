import * as argon2 from 'argon2';

export const defaultHashOptions = () => {
  return {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 4,
    parallelism: 2,
  };
};
