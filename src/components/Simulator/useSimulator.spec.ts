import { renderHook, act } from "@testing-library/react";
import { useSimulator } from "./useSimulator";
import * as loanCalculatorModule from "../../utils/calculator/loan-calculator";

const mockLoanResult = {
  monthlyPayment: 100,
  totalPayment: 1200,
  interest: 200,
  rateYear: 5,
}

function createFakeFormEvent(): React.FormEvent<HTMLFormElement> {
  return {
    preventDefault: jest.fn(),
  } as unknown as React.FormEvent<HTMLFormElement>;
}

describe("useSimulator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve inicializar com valores padrão corretos", () => {
    const { result } = renderHook(() => useSimulator());

    expect(result.current.amount).toBe("");
    expect(result.current.months).toBe("");
    expect(result.current.birthDate).toBe("");
    expect(result.current.result).toBeNull();
    expect(result.current.isFormValid).toBe(false);
  });

  it("deve atualizar os estados amount, months e birthDate", () => {
    const { result } = renderHook(() => useSimulator());

    act(() => {
      result.current.setAmount("1000");
      result.current.setMonths("12");
      result.current.setBirthDate("1990-01-01");
    });

    expect(result.current.amount).toBe("1000");
    expect(result.current.months).toBe("12");
    expect(result.current.birthDate).toBe("1990-01-01");
  });

  it("deve validar o formulário corretamente", () => {
    const { result } = renderHook(() => useSimulator());

    act(() => {
      result.current.setAmount("1000");
      result.current.setMonths("12");
      result.current.setBirthDate("1990-01-01");
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it("deve chamar loanCalculator ao submeter e salvar o resultado", () => {
    const spyLoanCalculator = jest
      .spyOn(loanCalculatorModule, "loanCalculator")
      .mockReturnValue(mockLoanResult);

    const { result } = renderHook(() => useSimulator());

    act(() => {
      result.current.setAmount("1000");
      result.current.setMonths("12");
      result.current.setBirthDate("1990-01-01");
    });

    act(() => {
      result.current.handleSubmit(createFakeFormEvent());
    });

    expect(spyLoanCalculator).toHaveBeenCalledTimes(1);
    expect(spyLoanCalculator).toHaveBeenCalledWith({
      amount: 1000,
      months: 12,
      birthDate: "1990-01-01",
    });
    expect(result.current.result).toEqual(mockLoanResult);
  });

  it("deve limpar os valores ao chamar handleClear", () => {
    const { result } = renderHook(() => useSimulator());

    act(() => {
      result.current.setAmount("1000");
      result.current.setMonths("12");
      result.current.setBirthDate("1990-01-01");
      result.current.handleClear();
    });

    expect(result.current.amount).toBe("");
    expect(result.current.months).toBe("");
    expect(result.current.birthDate).toBe("");
    expect(result.current.result).toBeNull();
  });
});
