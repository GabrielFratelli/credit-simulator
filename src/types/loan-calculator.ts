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

export interface SimulatorViewProps {
  amount: string;
  months: string;
  birthDate: string;
  result: LoanResult | null;
  isFormValid: boolean;
  onAmountChange: (value: string) => void;
  onMonthsChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}