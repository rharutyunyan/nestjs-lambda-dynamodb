import { Injectable, Inject } from '@nestjs/common';

import pino from 'pino';

import { OPTIONS_PROVIDER_TOKEN } from './constants';
import { PinoParams, isPassedLogger } from './pino.params';

interface PinoMethods
  extends Pick<pino.BaseLogger, 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'> {}

type LoggerFn =
  | ((msg: string, ...args: any[]) => void)
  | ((obj: object, msg?: string, ...args: any[]) => void);

let outOfContext: pino.Logger;

@Injectable()
export class PinoLogger implements PinoMethods {
  private context = '';

  constructor(@Inject(OPTIONS_PROVIDER_TOKEN) options: PinoParams) {
    if (!outOfContext) {
      if (Array.isArray(options)) {
        outOfContext = pino(...options);
      } else if (isPassedLogger(options)) {
        outOfContext = options.logger;
      } else if (options && 'useExisting' in options) {
        const { useExisting, ...rest } = options;
        outOfContext = pino(rest);
      } else {
        outOfContext = pino(options || undefined);
      }
      pino.LOG_VERSION = null;
      outOfContext.LOG_VERSION = null;
    }
  }

  trace(msg: string, ...args: any[]): void;
  trace(obj: object, msg?: string, ...args: any[]): void;
  trace(...args: Parameters<LoggerFn>) {
    this.call('trace', ...args);
  }

  debug(msg: string, ...args: any[]): void;
  debug(obj: object, msg?: string, ...args: any[]): void;
  debug(...args: Parameters<LoggerFn>) {
    this.call('debug', ...args);
  }

  info(msg: string, ...args: any[]): void;
  info(obj: object, msg?: string, ...args: any[]): void;
  info(...args: Parameters<LoggerFn>) {
    this.call('info', ...args);
  }

  warn(msg: string, ...args: any[]): void;
  warn(obj: object, msg?: string, ...args: any[]): void;
  warn(...args: Parameters<LoggerFn>) {
    this.call('warn', ...args);
  }

  error(msg: string, ...args: any[]): void;
  error(obj: object, msg?: string, ...args: any[]): void;
  error(...args: Parameters<LoggerFn>) {
    this.call('error', ...args);
  }

  fatal(msg: string, ...args: any[]): void;
  fatal(obj: object, msg?: string, ...args: any[]): void;
  fatal(...args: Parameters<LoggerFn>) {
    this.call('fatal', ...args);
  }

  setContext(value: string) {
    this.context = value;
  }

  private call(method: pino.Level, ...args: Parameters<LoggerFn>) {
    const context = this.context;
    if (context) {
      const firstArg = args[0];
      if (typeof firstArg === 'object') {
        args = [Object.assign({ context }, firstArg), ...args.slice(1)];
      } else {
        console.log('-----mtav stexxx ', args);
        args = [{ context }, ...args] as any;
      }
    }

    (this.logger[method] as any)(...args);
  }

  private get logger() {
    return outOfContext;
  }
}
