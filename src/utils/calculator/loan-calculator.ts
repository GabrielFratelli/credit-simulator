import type { LoanInputProps, LoanResultProps } from "../../types/loan-calculator";
import { formatNumber } from "../formats/format";

/**
 * Calcula a idade, comparando a data de nascimento com a data atual.
 */
function calculateAge(birthDate: Date, today: Date = new Date()): number {
  const yearDiff = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  // Ajusta idade se ainda não fez aniversário no ano
  return monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? yearDiff - 1 : yearDiff;
}

/**
 * Retorna a taxa anual de acordo com a faixa etária.
 */
function getAnnualRateByAge(age: number): number {
  if (age <= 25) return 0.05;
  if (age <= 40) return 0.03;
  if (age <= 60) return 0.02;
  return 0.04;
}

/**
 * Calcula o valor da parcela mensal do empréstimo.
 * Usa a fórmula de amortização.
 */
function calculateMonthlyPayment(principal: number, monthlyRate: number, months: number): number {
  return monthlyRate === 0
    ? principal / months
    : principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
}

/**
 * Função principal do simulador de empréstimo.
 * Recebe os dados do empréstimo e retorna o resultado formatado.
 */
export function loanCalculator({
  amount,
  months,
  birthDate,
}: LoanInputProps): LoanResultProps {
  const age = calculateAge(new Date(birthDate));
  const annualRate = getAnnualRateByAge(age);
  const monthlyRate = annualRate / 12;

  const monthlyPayment = calculateMonthlyPayment(amount, monthlyRate, months);
  const totalPayment = monthlyPayment * months;
  const interest = totalPayment - amount;

  return {
    monthlyPayment: formatNumber(monthlyPayment),
    totalPayment: formatNumber(totalPayment),
    interest: formatNumber(interest),
    rateYear: formatNumber(annualRate * 100),
  };
}