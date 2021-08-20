import { Injectable, Logger } from '@nestjs/common';
import * as Joi from '@hapi/joi';

import { IServiceConfig } from './config.contract';
import { Environment, IAWSDetails, ISwagger } from '../../../types';
import { ConfigSchema } from './config.schema';

@Injectable()
export class ServiceConfig implements IServiceConfig {
  private logger: Logger = new Logger(ServiceConfig.name);

  public environment: string = process.env.APP_ENVIRONMENT || Environment.Development;
  public firstConnectUrl: string = process.env.APP_FIRST_CONNECT_URL;
  public port: number = parseInt(process.env.APP_PORT, 10) || 3000;
  public swagger: ISwagger = {
    Name: process.env.APP_SWAGGER_NAME || 'Swagger',
    Description: process.env.APP_SWAGGER_DESCRIPTION || 'service',
    Version: process.env.APP_SWAGGER_VERSION || 'v1',
    Path: (process.env.APP_SWAGGER_PATH = '/api'),
  };
  public globalPrefix: string = process.env.APP_GLOBAL_PREFIX || '/api';
  private firstConnectAuthToken: string = process.env.APP_FIRST_AUTH_TOKEN;
  private aws: IAWSDetails = {
    Key: process.env.APP_AWS_KEY,
    Secret: process.env.APP_AWS_SECRET,
    Endpoint: process.env.APP_AWS_ENDPOINT,
    Region: process.env.APP_AWS_REGION,
  };

  print() {
    this.logger.log(`APP_ENVIRONMENT: ${this.environment}`);
    this.logger.log(`APP_FIRST_CONNECT_URL: ${this.firstConnectUrl}`);
    this.logger.log(`APP_PORT: ${JSON.stringify(this.port)}`);
    this.logger.log(`SWAGGER: ${JSON.stringify(this.swagger)}`);
    this.logger.log(`APP_GLOBAL_PREFIX: ${JSON.stringify(this.globalPrefix)}`);
    this.logger.log(`APP_AWS_ENDPOINT: ${this.aws.Endpoint}`);
  }

  isValid() {
    const schema = Joi.object(ConfigSchema);
    const { error } = schema.validate(this, { stripUnknown: true });
    if (error) {
      this.logger.error(`Joi validation error: ${JSON.stringify(error.details)}`);
    } else {
      this.logger.debug('Joi validation success');
    }
    return !error;
  }

  getFirstConnectAuthToken(): string {
    return this.firstConnectAuthToken;
  }

  getAwsDetails(): IAWSDetails {
    return this.aws;
  }
}
