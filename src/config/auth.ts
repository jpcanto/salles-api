export const authConfig = () => ({
  jwt: {
    secret: process.env.JWT_HASH,
    expiresIn: process.env.JWT_EXPIRES,
  },
});
