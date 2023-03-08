import Joi from 'joi';
import RequestValidationMiddleware from '@shared/http/middlewares/RequestValidationMiddleware';

export const productIdMiddleware = new RequestValidationMiddleware(
  Joi.object({
    id: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required(),
  }),
  'params'
);

export const productMiddleware = new RequestValidationMiddleware(
  Joi.object({
    name: Joi.string()
      .required(),
    price: Joi.number().precision(4).required(),
    quantity: Joi.number().integer().required(),
  }),
  'body'
);
