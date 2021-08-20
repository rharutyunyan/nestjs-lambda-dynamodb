import { ErrorCode } from './error-codes';

const ERROR_PREFIX = 'ERR';
const UNKNOWN_ERROR = 500;

export const getCodeByHttpStatus = (status: number): string => {
  return `${ERROR_PREFIX}${status}`;
};

export const getHttpStatus = (errorCode: string): number => {
  if (errorCode.indexOf(ERROR_PREFIX) === -1) {
    return UNKNOWN_ERROR;
  }
  const status: string = errorCode.replace(ERROR_PREFIX, '');
  if (status.length < 3) {
    return UNKNOWN_ERROR;
  }
  const normilizedStatus = status.substring(0, 3);
  return parseInt(normilizedStatus, 10);
};

export enum ExceptionSourceType {
  Application = 'application',
  QueryHandler = 'query-handler',
}

export class ApplicationException extends Error {
  private errorCode: ErrorCode;

  public readonly sourceType: ExceptionSourceType | string = ExceptionSourceType.Application;

  constructor(
    errorCode: ErrorCode,
    public message: string,
    public silence: boolean = false,
    public details?: any,
    public reason?: any,
  ) {
    super();
    this.errorCode = errorCode;
  }

  public getErrorCode(): string {
    return this.errorCode.code;
  }

  public getHttpStatus(): number {
    return getHttpStatus(this.getErrorCode());
  }
}

export class ActiveException extends ApplicationException {
  constructor(
    errorCode: ErrorCode,
    public message: string,
    public details?: any,
    public reason?: any,
  ) {
    super(errorCode, message, false, details, reason);
  }
}

export class QueryHandlerException extends ActiveException {
  public readonly sourceType: ExceptionSourceType = ExceptionSourceType.QueryHandler;

  constructor(
    errorCode: ErrorCode,
    public message: string,
    public queryType: string,
    public queryData: string,
    public reason?: any,
  ) {
    super(errorCode, message, queryData, reason);
  }
}
