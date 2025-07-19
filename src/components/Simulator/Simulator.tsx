import { useSimulator } from "./useSimulator";
import { SimulatorView } from "./SimulatorView";

export function Simulator() {
  const {
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
  } = useSimulator();

  return (
    <SimulatorView
      amount={amount}
      months={months}
      birthDate={birthDate}
      result={result}
      isFormValid={isFormValid}
      isLoading={isLoading}
      onAmountChange={setAmount}
      onMonthsChange={setMonths}
      onBirthDateChange={setBirthDate}
      onSubmit={handleSubmit}
      onClear={handleClear}
    />
  );
}
