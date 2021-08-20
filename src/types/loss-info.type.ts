class ILoss {
  description: string;
  amount: number;
}

export interface ILossInfoType {
  hadLossesForPreviousYears: boolean;
  losses?: ILoss[];
}
