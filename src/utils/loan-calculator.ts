import type { LoanInput, LoanResult } from "../types/loan-calculator"

export function loanCalculator({ amount, months, birthDate }: LoanInput): LoanResult {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  // Determinar taxa de juros anual baseada na idade
  let rateYear = 0
  if (age <= 25) rateYear = 0.05
  else if (age >= 26 && age <= 40) rateYear = 0.03
  else if (age >= 41 && age <= 60) rateYear = 0.02
  else rateYear = 0.04

  const r = rateYear / 12 // taxa mensal
  const n = months
  const PV = amount

  // Fórmula PMT = PV * r / (1 - (1 + r)^-n)
  const monthlyPayment = r === 0
    ? PV / n
    : PV * (r / (1 - Math.pow(1 + r, -n)))

  const totalPayment = monthlyPayment * n
  const interest = totalPayment - PV

  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    interest: Number(interest.toFixed(2)),
    rateYear: rateYear * 100 // em %
  }
}
