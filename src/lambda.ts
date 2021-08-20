import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Context, Handler } from 'aws-lambda';
import express from 'express';

import { AppModule } from './app.module';
import { ServiceConfig, ServiceExceptionFilter, Logger, PinoLogger } from './common';
import { Environment } from './types';

let cachedServer: Handler;

function setupSwagger(nestApp: INestApplication): void {
  const config = nestApp.get(ServiceConfig);
  if (config.environment === Environment.Development) {
    const documentOptions = new DocumentBuilder()
      .setTitle(config.swagger.Name)
      .setDescription(config.swagger.Description)
      .setVersion(config.swagger.Version)
      .addTag('cortrie')
      .build();
    const document = SwaggerModule.createDocument(nestApp, documentOptions);
    SwaggerModule.setup('swagger', nestApp, document);
  }
}

async function bootstrap(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    const validationOptions = {
      validationError: { target: false },
    };
    nestApp.useGlobalPipes(new ValidationPipe(validationOptions));
    nestApp.enableCors();
    const logger: Logger = new Logger(new PinoLogger(null));
    nestApp.useLogger(logger);
    nestApp.useGlobalFilters(new ServiceExceptionFilter());
    setupSwagger(nestApp);
    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
  if (event.path === '/swagger') {
    event.path = '/swagger/';
  }
  event.path = event.path.includes('swagger-ui') ? `/swagger${event.path}` : event.path;

  const server = await bootstrap();
  return server(event, context, callback);
};
