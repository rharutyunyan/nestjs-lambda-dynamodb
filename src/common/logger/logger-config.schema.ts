import * as Joi from '@hapi/joi';

export const LoggerSchema = {
  environment: Joi.string().required(),
  level: Joi.string().required(),
  prettyPrint: Joi.boolean().required(),
} as any;
