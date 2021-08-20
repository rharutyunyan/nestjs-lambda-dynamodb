import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Trim } from 'class-sanitizer';

class BoCoverage {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  street: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  city: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  zipCode: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Trim()
  state: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  buildingLimit: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  propertyDeductible: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  propertyLimit: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasSprinklerSystem?: boolean;
}

class PlCoverage {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  occurrenceLimit: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  deductible: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  grossAnnualRevenue: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  yearsOfPriorActsToCover: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  yearsOfExperience: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  areCertificationsRequired: boolean;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  doesApplicantMaintainCertifications: boolean;
}

class GlCoverage {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  generalLiabilityLimit: number;
}

class Loss {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

class LossInfo {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  hadLossesForPreviousYears: boolean;

  @ApiPropertyOptional({ type: [Loss] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Loss)
  losses?: Loss[];
}

export class UpdateQuestionnaireRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BoCoverage)
  boCoverageInfo?: BoCoverage;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PlCoverage)
  plCoverageInfo?: PlCoverage;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GlCoverage)
  glCoverageInfo?: GlCoverage;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LossInfo)
  lossInfo?: LossInfo;
}
