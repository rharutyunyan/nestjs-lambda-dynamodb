export interface IApplicantInfo {
  firstName: string;
  businessName: string;
  lastName: string;
  mailingState: string;
  mailingStreet: string;
  mailingCity: string;
  businessStartDate: string;
  policyStartDate: string;
  annualPayroll: number;
  grossAnnualSales: number;
  industryId: string;
  akHash: string;
  numberOfEmployees: number;
  email: string;
  phoneNumber: string;
  mailingUnit?: string;
  mailingZipCode: string;
}
