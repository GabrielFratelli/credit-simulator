import {
  TextField,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { formatCurrencyBRL } from "../../utils/format";
import type { LoanResult } from "../../types/loan-calculator";

interface SimulatorViewProps {
  amount: string;
  months: string;
  birthDate: string;
  result: LoanResult | null;
  isFormValid: boolean;
  onAmountChange: (value: string) => void;
  onMonthsChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

export function SimulatorView({
  amount,
  months,
  birthDate,
  result,
  isFormValid,
  onAmountChange,
  onMonthsChange,
  onBirthDateChange,
  onSubmit,
  onClear,
}: SimulatorViewProps) {
  return (
    <Stack
      spacing={3}
      sx={{ maxWidth: 500, margin: "2rem auto", padding: 3 }}
      component="form"
      onSubmit={onSubmit}
    >
      <Typography variant="h5" textAlign="center">
        Simulador de Crédito
      </Typography>

      <TextField
        label="Valor do Empréstimo"
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        required
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />

      <TextField
        label="Prazo (em meses)"
        type="number"
        value={months}
        onChange={(e) => onMonthsChange(e.target.value)}
        required
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />

      <TextField
        label="Data de Nascimento"
        type="date"
        value={birthDate}
        onChange={(e) => onBirthDateChange(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: new Date().toISOString().split("T")[0] }}
      />

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isFormValid}
        >
          Simular
        </Button>
        <Button type="button" variant="outlined" size="large" onClick={onClear}>
          Limpar
        </Button>
      </Stack>

      {result && (
        <Card sx={{ marginTop: 2, backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resultado da Simulação
            </Typography>
            <Typography>Taxa de Juros Anual: {result.rateYear}%</Typography>
            <Typography>
              Valor da Parcela: {formatCurrencyBRL(result.monthlyPayment)}
            </Typography>
            <Typography>
              Valor Total a Pagar: {formatCurrencyBRL(result.totalPayment)}
            </Typography>
            <Typography>
              Total de Juros: {formatCurrencyBRL(result.interest)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
