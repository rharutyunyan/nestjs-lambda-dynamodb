import { Injectable } from '@nestjs/common';
import { InjectModel, Model, QueryResponse, Document } from 'nestjs-dynamoose';
import { v4 as uuid } from 'uuid';

import { IQuestionnaire, IQuestionnaireKey, QuoteStatuses } from '../types';
import { CreateQuestionnaireRequest, UpdateQuestionnaireRequest } from '../request-response-models';

@Injectable()
export class QuestionnaireRepository {
  constructor(
    @InjectModel('Questionnaire')
    private questionnaireStatisticModel: Model<IQuestionnaire, IQuestionnaireKey>,
  ) {}

  async create(data: CreateQuestionnaireRequest): Promise<IQuestionnaire> {
    return this.questionnaireStatisticModel.create({
      id: uuid(),
      status: QuoteStatuses.IN_PROGRESS,
      ...data,
    });
  }

  async update(id: string, data: UpdateQuestionnaireRequest): Promise<Document<IQuestionnaire>> {
    return this.questionnaireStatisticModel.update({ id }, data);
  }

  async getQuestionnaireById(
    questionnaireId: string,
  ): Promise<QueryResponse<Document<IQuestionnaire>>> {
    return this.questionnaireStatisticModel.query({ id: questionnaireId }).limit(1).exec();
  }
}
