import { Inject, Provider } from '@nestjs/common';
import { PinoLogger } from './pino.logger';

const decoratedTokenPrefix = 'PinoLogger:';

const decoratedLoggers = new Set<string>();

export function InjectPinoLogger(context = '') {
  decoratedLoggers.add(context);
  return Inject(`${decoratedTokenPrefix}${context}`);
}

function createDecoratedLoggerProvider(context: string): Provider<PinoLogger> {
  return {
    provide: `${decoratedTokenPrefix}${context}`,
    useFactory: (logger: PinoLogger) => {
      logger.setContext(context);
      return logger;
    },
    inject: [PinoLogger],
  };
}

export function createProvidersForDecorated(): Array<Provider<PinoLogger>> {
  return [...decoratedLoggers.values()].map((context) => createDecoratedLoggerProvider(context));
}
