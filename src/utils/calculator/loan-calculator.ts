import type { LoanInputProps, LoanResultProps } from "../../types/loan-calculator"
import { formatNumber } from "../formats/format"


function calculateAge(birthDate: Date, today: Date = new Date()): number {
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }
  return age
}

function getAnnualRateByAge(age: number): number {
  if (age <= 25) return 0.05
  if (age <= 40) return 0.03
  if (age <= 60) return 0.02
  return 0.04
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return principal / months
  return principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)))
}

export function loanCalculator({ amount, months, birthDate }: LoanInputProps): LoanResultProps {
  const age = calculateAge(new Date(birthDate))
  const annualRate = getAnnualRateByAge(age)
  const monthlyRate = annualRate / 12

  const monthlyPayment = calculateMonthlyPayment(amount, monthlyRate, months)
  const totalPayment = monthlyPayment * months
  const interest = totalPayment - amount

  return {
    monthlyPayment: formatNumber(monthlyPayment),
    totalPayment: formatNumber(totalPayment),
    interest: formatNumber(interest),
    rateYear: formatNumber((annualRate * 100))
  }
}