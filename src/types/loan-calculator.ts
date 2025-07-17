export interface LoanInput {
  amount: number;
  months: number;
  birthDate: string;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  interest: number;
  rateYear: number;
}