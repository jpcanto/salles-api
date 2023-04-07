import Joi from 'joi';
import RequestValidationMiddleware from '@shared/infra/http/middlewares/RequestValidationMiddleware';

export const isUserIdValid = new RequestValidationMiddleware(
  Joi.object({
    id: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required(),
  }),
  'params'
).execute;

export const isUSerBodyValid = new RequestValidationMiddleware(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  'body'
).execute;

export const isSessionBodyValid = new RequestValidationMiddleware(
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  'body'
).execute;
