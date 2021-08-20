import { ActiveException } from './application.exception';
import { ErrorCode } from './error-codes';

export class BadRequestException extends ActiveException {
  constructor(details: any, error?: any) {
    super(ErrorCode.ERR400, 'Bad Request', details, error);
  }
}
