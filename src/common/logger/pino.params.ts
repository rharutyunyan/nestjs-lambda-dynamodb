import { ModuleMetadata } from '@nestjs/common/interfaces';

import * as pinoHttp from 'pino-http';
import pino from 'pino';
import { DestinationStream } from 'pino';

export interface PassedLogger {
  logger: pino.Logger;
}

export interface UseExisting {
  useExisting: boolean;
}

export type PinoParams =
  | null
  | pinoHttp.Options
  | DestinationStream
  | [pinoHttp.Options, DestinationStream]
  | UseExisting;

export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => PinoParams | Promise<PinoParams>;
  inject?: any[];
}

export function isPassedLogger(params: PinoParams): params is PassedLogger {
  return !!params && 'logger' in params;
}
