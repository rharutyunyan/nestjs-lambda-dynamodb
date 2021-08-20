import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

import { QuestionnaireService } from '../services';
import {
  CreateQuestionnaireRequest,
  UpdateQuestionnaireRequest,
  CreateQuestionnaireResponse,
  UpdateQuestionnaireResponse,
} from '../request-response-models';
import { IQuestionnaire } from '../types';

@Controller('/questionnaire')
@ApiTags('Questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create Questionnaire',
    type: CreateQuestionnaireResponse,
  })
  @ApiOperation({ summary: 'Questionnaire is created' })
  @ApiBody({
    description: 'CreateQuestionnaireRequest',
    type: CreateQuestionnaireRequest,
    required: true,
  })
  async createQuestionnaire(@Body() body: CreateQuestionnaireRequest): Promise<IQuestionnaire> {
    return this.questionnaireService.createQuestionnaire(body);
  }

  @Patch(':questionnaireId')
  @ApiResponse({
    status: 200,
    description: 'Update questionnaire',
    type: UpdateQuestionnaireResponse,
  })
  @ApiOperation({ summary: 'Questionnaire is updated' })
  @ApiBody({
    type: UpdateQuestionnaireRequest,
    description: 'UpdateQuestionnaireRequest',
    required: true,
  })
  async updateQuestionnaire(
    @Param('questionnaireId') questionnaireId: string,
    @Body() params: UpdateQuestionnaireRequest,
  ): Promise<IQuestionnaire> {
    return this.questionnaireService.updateQuestionnaire(questionnaireId, params);
  }
}
