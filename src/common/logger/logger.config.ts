import { Injectable, Logger } from '@nestjs/common';

import * as os from 'os';
import * as Joi from '@hapi/joi';

import { Environment } from '../../types';
import { ServiceContext, CORRELATION_ID_KEY } from '../services/context/service.context';
import { LoggerSchema } from './logger-config.schema';

@Injectable()
export class LoggerConfig {
  private logger: Logger = new Logger(LoggerConfig.name);

  public environment = process.env.APP_ENVIRONMENT || Environment.Development;
  public level: string = process.env.APP_LOG_LEVEL || 'debug';
  public prettyPrint: boolean = Boolean(process.env.APP_PRETTY_LOG === 'true') || false;

  options(): any {
    const opt = {
      base: { pid: process.pid, hostname: os.hostname() },
      level: this.level,
      mixin: this.logMixin.bind(this),
      genReqId: this.correlationId.bind(this),
      serializers: {
        req(req) {
          req.body = req.raw.body;
          return req;
        },
      },
    };

    if (this.prettyPrint) {
      return { ...opt, prettyPrint: { colorize: true, translateTime: true } };
    }
    return opt;
  }

  private logMixin() {
    const correlationId = this.correlationId();
    return correlationId
      ? {
          [`${CORRELATION_ID_KEY}`]: correlationId,
        }
      : {};
  }

  private correlationId() {
    return ServiceContext.current.correlationId;
  }

  print() {
    this.logger.log(`APP_LOG_LEVEL: ${this.level}`);
    this.logger.log(`APP_PRETTY_LOG: ${this.prettyPrint}`);
  }

  isValid() {
    const schema = Joi.object(LoggerSchema);
    const { error } = schema.validate(this, { stripUnknown: true });
    if (error) {
      this.logger.error(`Joi validation error: ${JSON.stringify(error.details)}`);
    } else {
      this.logger.debug('Joi validation success');
    }
    return !error;
  }
}
