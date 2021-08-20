export interface IBusinessOwnersCoverageType {
  street: string;
  city: string;
  zipCode: string;
  state: string;
  buildingLimit: number;
  propertyDeductible: number;
  propertyLimit: number;
  unit?: string;
  hasSprinklerSystem?: boolean;
}
