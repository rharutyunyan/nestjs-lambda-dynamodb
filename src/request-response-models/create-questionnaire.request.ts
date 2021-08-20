import 'reflect-metadata';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ValidateNested,
  IsEnum,
  IsNotEmpty,
  IsDefined,
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Trim } from 'class-sanitizer';
import { Type } from 'class-transformer';

import { Policy } from '../constants';

class ApplicantInfo {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(2, { message: 'firstName can be short than 2' })
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(2, { message: 'businessName can be short than 2' })
  businessName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(2, { message: 'lastName can be short than 2' })
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(2, { message: 'mailingState can be short than 2' })
  mailingState: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(2, { message: 'mailingStreet can be short than 2' })
  mailingStreet: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  @MinLength(2, { message: 'mailingCity can be short than 2' })
  mailingCity: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'businessStartDate can be short than 2' })
  businessStartDate: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'policyStartDate can be short than 2' })
  policyStartDate: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  annualPayroll: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  grossAnnualSales: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'industryId can be short than 2' })
  industryId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'akHash can be short than 2' })
  akHash: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  numberOfEmployees: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mailingUnit?: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  mailingZipCode: string;
}

export class CreateQuestionnaireRequest {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ApplicantInfo)
  applicantInfo!: ApplicantInfo;

  @ApiProperty({ enum: Policy })
  @IsArray()
  @IsEnum(Policy, { each: true })
  policyTypes: Policy[];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  producerId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  producerCode: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  producerEmail: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
