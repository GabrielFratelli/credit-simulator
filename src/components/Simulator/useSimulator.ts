import { useState } from "react";
import type { LoanResultProps } from "../../types/loan-calculator";
import { loanCalculator } from "../../utils/calculator/loan-calculator";

export function useSimulator() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<LoanResultProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
    Number(amount) > 0 && Number(months) > 0 && birthDate !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setResult(null); // limpa resultado anterior enquanto carrega

    await new Promise((res) => setTimeout(res, 5000)); // delay para mostrar o loading

    const data = { amount: Number(amount), months: Number(months), birthDate };
    setResult(loanCalculator(data));
    setIsLoading(false);
  };

  const handleClear = () => {
    if (isLoading) return;
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
    isLoading,
    handleSubmit,
    handleClear,
  };
}
