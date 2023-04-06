import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ParsedQs } from 'qs';

type RequestStData = {
  body: Record<string, any>;
  query: ParsedQs;
  params: Record<string, string>;
  headers: Record<string, string>;
};

export default class RequestValidationMiddleware {
  private schema: Schema;
  private strategy: keyof RequestStData;

  constructor(schema: Schema, strategy: keyof RequestStData) {
    this.schema = schema;
    this.strategy = strategy;
  }

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req[this.strategy]);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  };
}
