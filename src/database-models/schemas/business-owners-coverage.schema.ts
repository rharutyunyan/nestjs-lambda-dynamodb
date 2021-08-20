export const BusinessOwnersCoverage = {
  street: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  hasSprinklerSystem: {
    type: Boolean,
  },
  propertyLimit: {
    type: Number,
    required: true,
  },
  propertyDeductible: {
    type: Number,
    required: true,
  },
  buildingLimit: {
    type: Number,
    required: true,
  },
};
