export const ApplicantInfo = {
  firstName: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mailingState: {
    type: String,
    required: true,
  },
  mailingStreet: {
    type: String,
    required: true,
  },
  mailingCity: {
    type: String,
    required: true,
  },
  mailingUnit: {
    type: String,
  },
  mailingZipCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  businessStartDate: {
    type: String,
    required: true,
  },
  policyStartDate: {
    type: String,
    required: true,
  },
  numberOfEmployees: {
    type: Number,
    required: true,
  },
  annualPayroll: {
    type: Number,
    required: true,
  },
  grossAnnualSales: {
    type: Number,
    required: true,
  },
  industryId: {
    type: String,
    required: true,
  },
  akHash: {
    type: String,
    required: true,
  },
};
