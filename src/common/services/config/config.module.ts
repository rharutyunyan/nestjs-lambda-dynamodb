import { Module } from '@nestjs/common';
import { ServiceConfig } from './service.config';

@Module({
  imports: [],
  exports: [ServiceConfig],
  providers: [ServiceConfig],
})
export class ConfigModule {}
