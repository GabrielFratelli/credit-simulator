export interface LoanInputProps {
  amount: number;
  months: number;
  birthDate: string;
}

export interface LoanResultProps {
  monthlyPayment: number;
  totalPayment: number;
  interest: number;
  rateYear: number;
}

export interface SimulatorProps {
  amount: string;
  months: string;
  birthDate: string;
  result: LoanResultProps | null;
  isFormValid: boolean;
  onAmountChange: (value: string) => void;
  onMonthsChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}