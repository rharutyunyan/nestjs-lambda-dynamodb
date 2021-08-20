import { Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { OrmModule } from './database';
import { Services } from './services';
import { Controllers } from './controllers';
import { Models } from './database-models';
import { Repositories } from './repositories';
import { ServiceConfig, ServiceContextMiddleware, LoggerModule, LoggerConfig } from './common';

@Module({
  imports: [
    ServiceConfig,
    OrmModule,
    DynamooseModule.forFeature(Models),
    LoggerModule.forRootAsync({
      useFactory: (config: LoggerConfig) => {
        return config.options();
      },
      inject: [LoggerConfig],
      providers: [LoggerConfig],
    }),
  ],
  controllers: [...Controllers],
  providers: [...Services, ...Repositories, ServiceConfig],
})
export class AppModule implements OnModuleInit {
  constructor(private svcConfig: ServiceConfig) {}

  public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(ServiceContextMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  onModuleInit(): void {
    this.svcConfig.print();
    if (!this.svcConfig.isValid()) {
      process.exit(1);
    }
  }
}
