import { Injectable, Logger as BaseLogger, LoggerService } from '@nestjs/common';

import { PinoLogger } from './pino.logger';

export interface ILogger {
  verbose(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
  log(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
}

const LOGGER_ID = '4dd94da6-29d9-4319-b7b0-7944d57c7bbd';

@Injectable()
export class Logger implements LoggerService, ILogger {
  public id: string = LOGGER_ID;

  constructor(private readonly logger: PinoLogger) {}

  // NOTE: $stub is workaround to avoid writing redundant isTimeDiffEnabled in log
  // logger.service in nest, line: 110
  verbose(message: any, ...args: any[]): void;
  verbose(message: any, context?: string, $stub?: boolean, ...args: any[]): void {
    if (context) {
      this.logger.trace({ context }, message, ...args);
    } else {
      this.logger.trace(message, ...args);
    }
  }

  // NOTE: $stub is workaround to avoid writing redundant isTimeDiffEnabled in log
  // logger.service in nest, line: 110
  debug(message: any, ...args: any[]): void;
  debug(message: any, context?: string, $stub?: boolean, ...args: any[]): void {
    if (context) {
      this.logger.debug({ context }, message, ...args);
    } else {
      this.logger.debug(message, ...args);
    }
  }

  // NOTE: $stub is workaround to avoid writing redundant isTimeDiffEnabled in log
  // logger.service in nest, line: 110
  log(message: any, ...args: any[]): void;
  log(message: any, context?: string, $stub?: boolean, ...args: any[]): void {
    if (context) {
      this.logger.info({ context }, message, ...args);
    } else {
      this.logger.info(message, ...args);
    }
  }

  // NOTE: $stub is workaround to avoid writing redundant isTimeDiffEnabled in log
  // logger.service in nest, line: 110
  warn(message: any, context?: string, $stub?: boolean, ...args: any[]): void {
    if (context) {
      this.logger.warn({ context }, message, ...args);
    } else {
      this.logger.warn(message, ...args);
    }
  }

  // NOTE: $stub is workaround to avoid writing redundant isTimeDiffEnabled in log
  // logger.service in nest, line: 110
  error(message: any, trace?: string, ...args: any[]): void;
  error(message: any, trace?: string, context?: string, $stub?: boolean, ...args: any[]): void {
    if (context) {
      this.logger.error({ context, trace }, message, ...args);
    } else if (trace) {
      this.logger.error({ trace }, message, ...args);
    } else {
      this.logger.error(message, ...args);
    }
  }
}
