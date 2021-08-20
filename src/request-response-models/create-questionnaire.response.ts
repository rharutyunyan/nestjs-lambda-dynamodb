import 'reflect-metadata';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { Policy } from '../constants';
import { QuoteStatuses } from '../types';

class ApplicantInfo {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  mailingState: string;

  @ApiProperty()
  mailingStreet: string;

  @ApiProperty()
  mailingCity: string;

  @ApiProperty()
  businessStartDate: string;

  @ApiProperty()
  policyStartDate: string;

  @ApiProperty()
  annualPayroll: number;

  @ApiProperty()
  grossAnnualSales: number;

  @ApiProperty()
  industryId: string;

  @ApiProperty()
  akHash: string;

  @ApiProperty()
  numberOfEmployees: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiPropertyOptional()
  mailingUnit?: string;

  @ApiProperty()
  mailingZipCode: string;
}

export class CreateQuestionnaireResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: ApplicantInfo })
  @Type(() => ApplicantInfo)
  applicantInfo!: ApplicantInfo;

  @ApiProperty({ enum: Policy })
  policyTypes: Policy[];

  @ApiProperty()
  producerId: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  createdDate: string;

  @ApiProperty()
  updatedDate: string;

  @ApiProperty({ enum: QuoteStatuses })
  status: string;

  @ApiProperty()
  producerCode: string;

  @ApiProperty()
  producerEmail: string;
}
