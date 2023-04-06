import Joi from 'joi';
import RequestValidationMiddleware from '@shared/http/middlewares/RequestValidationMiddleware';

export const usersIdMiddleware = new RequestValidationMiddleware(
  Joi.object({
    id: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required(),
  }),
  'params'
);

export const usersBodyMiddleware = new RequestValidationMiddleware(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  'body'
);

export const sessionsBodyMiddleware = new RequestValidationMiddleware(
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  'body'
);
