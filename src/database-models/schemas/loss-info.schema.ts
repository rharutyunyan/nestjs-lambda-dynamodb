export const LossInfo = {
  hadLossesForPreviousYears: {
    type: Boolean,
    required: true,
  },
  losses: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          description: String,
          amount: Number,
        },
      },
    ],
  },
};
