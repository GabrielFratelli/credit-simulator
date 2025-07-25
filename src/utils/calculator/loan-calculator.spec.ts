import * as format from '../formats/format';
import { loanCalculator } from './loan-calculator';

// Testes para a função principal do simulador de empréstimo
describe('loanCalculator', () => {
  // Mock da função de formatação para padronizar os retornos nos testes
  const mockFormatNumber = jest
    .spyOn(format, 'formatNumber')
    .mockImplementation((n: number, d = 2) => Number(n.toFixed(d)));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve calcular corretamente para idade <= 25', () => {
    const input = {
      amount: 12000,
      months: 12,
      birthDate: '2005-07-17',
    };
    const result = loanCalculator(input);

    expect(result.rateYear).toBe(5.00); // Taxa esperada para idade <= 25
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalPayment).toBeGreaterThan(input.amount);
    expect(result.interest).toBeCloseTo(result.totalPayment - input.amount, 2);
    expect(mockFormatNumber).toHaveBeenCalled();
  });

  it('deve calcular corretamente para idade entre 26 e 40', () => {
    const input = {
      amount: 12000,
      months: 24,
      birthDate: '1995-07-17',
    };
    const result = loanCalculator(input);

    expect(result.rateYear).toBe(3.00); // Taxa para 26 <= idade <= 40
    expect(result.monthlyPayment).toBeGreaterThan(0);
  });

  it('deve calcular corretamente para idade entre 41 e 60', () => {
    const input = {
      amount: 12000,
      months: 36,
      birthDate: '1975-07-17',
    };
    const result = loanCalculator(input);

    expect(result.rateYear).toBe(2.00); // Taxa para 41 <= idade <= 60
  });

  it('deve calcular corretamente para idade > 60', () => {
    const input = {
      amount: 12000,
      months: 48,
      birthDate: '1950-07-17',
    };
    const result = loanCalculator(input);

    expect(result.rateYear).toBe(4.00); // Taxa para idade > 60
  });

  it('deve chamar formatNumber para todos os retornos', () => {
    const input = {
      amount: 10000,
      months: 10,
      birthDate: '2000-07-17',
    };
    loanCalculator(input);

    // monthlyPayment, totalPayment, interest, rateYear
    expect(mockFormatNumber).toHaveBeenCalledTimes(4);
  });
});