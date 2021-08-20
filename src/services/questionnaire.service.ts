import { Injectable, Logger } from '@nestjs/common';
import { to } from 'await-to-js';
import { isEmpty } from 'lodash';

import { QuestionnaireRepository } from '../repositories';
import { CreateQuestionnaireRequest, UpdateQuestionnaireRequest } from '../request-response-models';
import { IQuestionnaire } from '../types';
import { QuestionnaireNotFoundException } from '../errors/rule-not-found.exception';
import { ApplicationException, ErrorCode } from '../common';

@Injectable()
export class QuestionnaireService {
  logger: Logger = new Logger(QuestionnaireService.name);
  constructor(private readonly questionnaireRepository: QuestionnaireRepository) {}

  async createQuestionnaire(data: CreateQuestionnaireRequest): Promise<IQuestionnaire> {
    this.logger.debug(`(createQuestionnaire) params: ${JSON.stringify(data)}`);
    return this.questionnaireRepository.create(data);
  }

  async updateQuestionnaire(
    questionnaireId: string,
    data: UpdateQuestionnaireRequest,
  ): Promise<IQuestionnaire> {
    this.logger.debug(
      `(updateQuestionnaire) questionnaireId: ${questionnaireId} params: ${JSON.stringify(data)}`,
    );

    // it can be null as all properties are optional
    if (isEmpty(data)) {
      throw new ApplicationException(ErrorCode.ERR400_1, 'Update body can not be empty');
    }

    const [error, [questionnaire]] = await to(
      this.questionnaireRepository.getQuestionnaireById(questionnaireId),
    );

    if (error || isEmpty(questionnaire)) {
      const err = error?.message || 'Failed to get questionnaire by provided Id';
      this.logger.error(
        `(updateQuestionnaire) questionnaireId: ${questionnaireId} error: ${JSON.stringify(err)}`,
      );
      throw new QuestionnaireNotFoundException(
        questionnaireId,
        'getQuestionnaireById',
        { questionnaireId },
        { err },
      );
    }

    return this.questionnaireRepository.update(questionnaireId, data);
  }
}
