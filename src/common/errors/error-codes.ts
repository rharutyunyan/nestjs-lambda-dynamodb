import { Enum, EnumType } from 'ts-jenum';

@Enum<ErrorCode>('code')
export class ErrorCode extends EnumType<ErrorCode>() {
  private constructor(readonly code: string, readonly description: string) {
    super();
  }

  // 400
  static readonly ERR400 = new ErrorCode('ERR400', 'general: bad request');
  static readonly ERR400_1 = new ErrorCode('ERR400_1', 'cortrie-svc: Update body can not be empty');

  // 404
  static readonly ERR404_1 = new ErrorCode('ERR404_1', 'cortrie-svc: questionnaire not found');

  // 500
  static readonly ERR500 = new ErrorCode('ERR500', 'general: unhandled exception');
}
