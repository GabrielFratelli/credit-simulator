import { useState } from "react";
import type { LoanResultProps } from "../../types/loan-calculator";
import { loanCalculator } from "../../utils/calculator/loan-calculator";

export function useSimulator() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<LoanResultProps | null>(null);

  const isFormValid =
    Number(amount) > 0 && Number(months) > 0 && birthDate !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { amount: Number(amount), months: Number(months), birthDate };
    setResult(loanCalculator(data));
  };

  const handleClear = () => {
    setAmount("");
    setMonths("");
    setBirthDate("");
    setResult(null);
  };

  return {
    amount,
    setAmount,
    months,
    setMonths,
    birthDate,
    setBirthDate,
    result,
    isFormValid,
    handleSubmit,
    handleClear,
  };
}
