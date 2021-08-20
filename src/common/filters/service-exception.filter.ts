import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { get } from 'lodash';

import { ApplicationException, getCodeByHttpStatus, getHttpStatus } from '../errors';
import { ServiceContext } from '../services/context/service.context';
@Catch()
export class ServiceExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(ServiceExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const timestamp = new Date().toISOString();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let exceptionResponse: any = {};
    const requestId = ServiceContext.current.correlationId;
    exception.correlationId = requestId;

    if (exception instanceof ApplicationException) {
      status = exception.getHttpStatus();
      exceptionResponse = {
        code: exception.getErrorCode(),
        message: exception.message,
        details: exception.details,
        requestId,
        timestamp,
        silence: exception.silence,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const code = getCodeByHttpStatus(status);
      const exRes: any = exception.getResponse();
      const error = exRes.error || exception.name;
      exceptionResponse = {
        code,
        message: error,
        details: exRes.message,
        requestId,
        timestamp,
        silence: status === HttpStatus.UNAUTHORIZED,
      };
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      const code = getCodeByHttpStatus(status);
      exceptionResponse = {
        code,
        message: exception.message,
        details: {
          name: exception.name,
          message: exception.message,
          stack: exception.stack,
        },
        requestId,
        timestamp,
        silence: false,
      };
    } else {
      const errorCode = get(exception, 'errorCode', {});
      status = errorCode.code ? getHttpStatus(errorCode.code) : HttpStatus.INTERNAL_SERVER_ERROR;
      exceptionResponse = {
        code: errorCode.code || 500,
        message: exception.message || errorCode.description || 'Unhandled exception',
        details: exception.details,
        requestId,
        timestamp,
        silence: false,
      };
    }

    this.logger.error(JSON.stringify(exception));

    res.status(status).json(exceptionResponse);
  }
}
