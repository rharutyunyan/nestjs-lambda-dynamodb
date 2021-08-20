import * as Joi from '@hapi/joi';

export const DatabaseSchema = {
  prefix: Joi.string().required(),
  aws: Joi.object().keys({
    Key: Joi.string().required(),
    Secret: Joi.string().required(),
    Endpoint: Joi.string().required(),
    Region: Joi.string().required(),
  }),
  local: Joi.bool().required(),
} as any;
