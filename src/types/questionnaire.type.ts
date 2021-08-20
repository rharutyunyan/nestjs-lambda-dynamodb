import { Policy } from '../constants';
import { IApplicantInfo } from './applicant-info.type';
import { IBusinessOwnersCoverageType } from './business-owners-coverage.type';
import { IGeneralLiabilityCoverageType } from './general-liability-coverage.type';
import { IProfessionalLiabilityCoverageType } from './professional-liability-coverage.type';
import { ILossInfoType } from './loss-info.type';

export interface IQuestionnaireKey {
  id: string;
}

export interface IQuestionnaire extends IQuestionnaireKey {
  producerId: string;
  clientId: string;
  policyTypes?: Policy[];
  createdDate?: string;
  updatedDate?: string;
  applicantInfo?: IApplicantInfo;
  boCoverageInfo?: IBusinessOwnersCoverageType;
  glCoverageInfo?: IGeneralLiabilityCoverageType;
  plCoverageInfo?: IProfessionalLiabilityCoverageType;
  lossInfo?: ILossInfoType;
  quoteBy?: string;
  quotes?: any;
  producerCode: string;
  producerEmail: string;
  status?: string;
}
