import { QueryHandlerException, ErrorCode } from '../common';

export class QuestionnaireNotFoundException extends QueryHandlerException {
  constructor(questionnaireId: string, queryType: string, queryData: any, reason: any) {
    super(
      ErrorCode.ERR404_1,
      `questionnaire with '${questionnaireId}' id not found`,
      queryType,
      queryData,
      reason,
    );
  }
}
