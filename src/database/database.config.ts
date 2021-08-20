import { Injectable, Logger } from '@nestjs/common';
import * as Joi from '@hapi/joi';

import { IDatabaseConfig } from './database.contracts';
import { DatabaseSchema } from './database-config.schema';
import { IAWSDetails } from '../types';

Injectable();
export class DatabaseConfig implements IDatabaseConfig {
  private logger: Logger = new Logger(DatabaseConfig.name);
  constructor(
    private aws: IAWSDetails = {
      Key: process.env.APP_AWS_KEY,
      Secret: process.env.APP_AWS_SECRET,
      Endpoint: process.env.APP_AWS_ENDPOINT,
      Region: process.env.APP_AWS_REGION,
    },
    public prefix: string = `${process.env.APP_ENVIRONMENT}-`,
    public local: boolean = process.env.OFFLINE_MODE === 'true',
  ) {}

  print() {
    this.logger.log(`REGION: ${this.aws.Region}`);
    this.logger.log(`PREFIX: ${this.prefix}`);
    this.logger.log(`LOCAL: ${this.local}`);
  }

  isValid() {
    const schema = Joi.object(DatabaseSchema);
    const { error } = schema.validate(this, { stripUnknown: true });
    if (error) {
      this.logger.error(`Joi validation error: ${JSON.stringify(error.details)}`);
    } else {
      this.logger.debug('Joi validation success');
    }
    return !error;
  }

  getAwsDetails(): IAWSDetails {
    return this.aws;
  }
}
