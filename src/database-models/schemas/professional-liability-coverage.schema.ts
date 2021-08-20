export const ProfessionalLiabilityCoverage = {
  occurrenceLimit: {
    type: Number,
    required: true,
  },
  deductible: {
    type: Number,
    required: true,
  },
  grossAnnualRevenue: {
    type: Number,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  yearsOfPriorActsToCover: {
    type: Number,
    required: true,
  },
  areCertificationsRequired: {
    type: Boolean,
    required: true,
  },
  doesApplicantMaintainCertifications: {
    type: Boolean,
    required: true,
  },
};
