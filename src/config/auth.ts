export default {
  jwt: {
    secret: process.env.JWT_HASH,
    expiresIn: process.env.JWT_EXPIRES,
  },
};
