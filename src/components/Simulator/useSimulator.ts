import { useState } from "react";
import type { LoanResultProps } from "../../types/loan-calculator";
import { loanCalculator } from "../../utils/calculator/loan-calculator";

/**
 * Controller hook responsável por gerenciar o estado do simulador de empréstimo.
 * Retorna métodos e estados para manipular o formulário e processar a simulação.
 */
export function useSimulator() {
  const [isLoading, setIsLoading] = useState(false); // Loading
  const [amount, setAmount] = useState(""); // Quantias
  const [months, setMonths] = useState(""); // Parcelas
  const [birthDate, setBirthDate] = useState(""); // Data de nascimento
  const [result, setResult] = useState<LoanResultProps | null>(null); // Resultado da simulação

  // Validação do formulário: todos os campos devem estar preenchidos e válidos
  const isFormValid =
    Number(amount) > 0 && Number(months) > 0 && birthDate !== "";

  /**
   * Submete o formulário, executa a simulação de empréstimo.
   * Aplica um delay para exibir o loading.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setResult(null); // Cada vez que acionado o Simular ele limpa resultado anterior

    // Simula delay para exibir loading
    await new Promise((res) => setTimeout(res, 1500));

    // Executa a simulação
    setResult(
      loanCalculator({
        amount: Number(amount),
        months: Number(months),
        birthDate,
      })
    );
    setIsLoading(false);
  };

  const handleClear = () => {
    if (isLoading) return;
    setAmount("");
    setMonths("");
    setBirthDate("");
    setResult(null);
  };

  // Retorna estados e métodos para o componente utilizar
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