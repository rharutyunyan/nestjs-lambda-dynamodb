import {
  Global,
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Inject,
} from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces';

import pinoHttp from 'pino-http';

import { Logger } from './logger';
import { OPTIONS_PROVIDER_TOKEN } from './constants';
import { PinoParams as Params, LoggerModuleAsyncOptions } from './pino.params';
import { PinoLogger } from './pino.logger';
import { createProvidersForDecorated } from './logger.inject';

@Global()
@Module({ providers: [Logger], exports: [Logger] })
export class LoggerCoreModule implements NestModule {
  static forRoot(options: Params | undefined): DynamicModule {
    const optionsProvider: Provider<Params> = {
      provide: OPTIONS_PROVIDER_TOKEN,
      useValue: options || null,
    };

    const decorated = createProvidersForDecorated();

    return {
      module: LoggerCoreModule,
      providers: [Logger, ...decorated, PinoLogger, optionsProvider],
      exports: [Logger, ...decorated, PinoLogger],
    };
  }

  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const optionsProvider: Provider<Params | Promise<Params>> = {
      provide: OPTIONS_PROVIDER_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const decorated = createProvidersForDecorated();

    const providers: any[] = [
      Logger,
      ...decorated,
      PinoLogger,
      optionsProvider,
      ...(options.providers || []),
    ];

    return {
      module: LoggerCoreModule,
      imports: options.imports,
      providers,
      exports: [Logger, ...decorated, PinoLogger],
    };
  }

  constructor(@Inject(OPTIONS_PROVIDER_TOKEN) private readonly options: Params) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(...createLoggerMiddlewares(this.options || {}))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

function createLoggerMiddlewares(params: Exclude<Params, null>) {
  if (Array.isArray(params)) {
    return [pinoHttp(...params)];
  }

  // FIXME: params type here is pinoHttp.Options | pino.DestinationStream
  // pinoHttp has two overloads, each of them takes those types
  return [pinoHttp(params as any)];
}
