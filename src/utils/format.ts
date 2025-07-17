export const formatCurrencyBRL = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export const formatNumber = (value: number, decimals = 2) =>
  Number(value.toFixed(decimals))
