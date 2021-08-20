import * as Joi from '@hapi/joi';

export const ConfigSchema = {
  environment: Joi.string().required(),
  port: Joi.number(),
  swagger: Joi.object().keys({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Version: Joi.string().required(),
    Path: Joi.string().required(),
  }),
  globalPrefix: Joi.string().required(),
  firstConnectAuthToken: Joi.string().required(),
  aws: Joi.object().keys({
    Key: Joi.string().required(),
    Secret: Joi.string().required(),
    Endpoint: Joi.string().required(),
    Region: Joi.string().required(),
  }),
} as any;
