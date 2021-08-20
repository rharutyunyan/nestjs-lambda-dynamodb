import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateQuestionnaireResponse } from './create-questionnaire.response';

class BoCoverage {
  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  buildingLimit: number;

  @ApiProperty()
  propertyDeductible: number;

  @ApiProperty()
  propertyLimit: number;

  @ApiPropertyOptional()
  unit?: string;

  @ApiPropertyOptional()
  hasSprinklerSystem?: boolean;
}

class PlCoverage {
  @ApiProperty()
  occurrenceLimit: number;

  @ApiProperty()
  deductible: number;

  @ApiProperty()
  grossAnnualRevenue: number;

  @ApiProperty()
  yearsOfPriorActsToCover: number;

  @ApiProperty()
  yearsOfExperience: number;

  @ApiProperty()
  areCertificationsRequired: boolean;

  @ApiProperty()
  doesApplicantMaintainCertifications: boolean;
}

class GlCoverage {
  @ApiProperty()
  generalLiabilityLimit: number;
}

class Loss {
  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;
}

class LossInfo {
  @ApiProperty()
  hadLossesForPreviousYears: boolean;

  @ApiPropertyOptional({ type: [Loss] })
  @Type(() => Loss)
  losses?: Loss[];
}

export class UpdateQuestionnaireResponse extends CreateQuestionnaireResponse {
  @ApiPropertyOptional()
  @Type(() => BoCoverage)
  boCoverageInfo?: BoCoverage;

  @ApiPropertyOptional()
  @Type(() => PlCoverage)
  plCoverageInfo?: PlCoverage;

  @ApiPropertyOptional()
  @Type(() => GlCoverage)
  glCoverageInfo?: GlCoverage;

  @ApiPropertyOptional()
  @Type(() => LossInfo)
  lossInfo?: LossInfo;
}
