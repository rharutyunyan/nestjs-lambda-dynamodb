import { Schema } from 'dynamoose';
import moment from 'moment';

import {
  ApplicantInfo,
  BusinessOwnersCoverage,
  GeneralLiabilityCoverage,
  ProfessionalLiabilityCoverage,
  LossInfo,
} from './schemas';
import { QuoteStatuses } from '../types';

export const QuestionnaireSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    producerId: {
      type: String,
      required: true,
      index: {
        global: true,
        rangeKey: 'createdDate',
        name: 'ProducerIndex',
        project: true,
      },
    },
    clientId: {
      type: String,
      required: true,
      index: {
        global: true,
        rangeKey: 'createdDate',
        name: 'ClientIndex',
        project: true,
      },
    },
    policyTypes: {
      type: Array,
      schema: [String],
      required: true,
    },
    createdDate: {
      type: String,
      default: moment().format(),
    },
    updatedDate: {
      type: String,
      default: moment().format(),
    },
    applicantInfo: {
      type: Object,
      schema: ApplicantInfo,
      required: true,
    },
    boCoverageInfo: {
      type: Object,
      schema: BusinessOwnersCoverage,
    },
    glCoverageInfo: {
      type: Object,
      schema: GeneralLiabilityCoverage,
    },
    plCoverageInfo: {
      type: Object,
      schema: ProfessionalLiabilityCoverage,
    },
    quoteBy: {
      type: String,
    },
    lossInfo: {
      type: Object,
      schema: LossInfo,
    },
    quotes: {
      type: Object,
    },
    producerCode: {
      type: String,
      required: true,
    },
    producerEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(QuoteStatuses),
      default: QuoteStatuses.IN_PROGRESS,
      index: {
        global: true,
        project: true,
        name: 'StatusIndex',
      },
    },
  },
  {
    saveUnknown: true,
  },
);

export const QuestionnaireModel = {
  name: 'Questionnaire',
  schema: QuestionnaireSchema,
};
