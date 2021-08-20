import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { DatabaseModule } from './database.module';
import { DatabaseConfig } from './database.config';

// todo: need to think about cold start
@Module({
  imports: [
    DynamooseModule.forRootAsync({
      useFactory: (config: DatabaseConfig) => ({
        local: config.local,
        aws: {
          accessKeyId: config.getAwsDetails().Key,
          secretAccessKey: config.getAwsDetails().Secret,
          region: config.getAwsDetails().Region,
        },
        model: {
          create: true,
          prefix: config.prefix,
        },
      }),
      imports: [DatabaseModule],
      inject: [DatabaseConfig],
    }),
  ],
})
export class OrmModule {}
