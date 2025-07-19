import {
  TextField,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { formatCurrencyBRL } from "../../utils//formats/format";
import type { SimulatorProps } from "../../types/loan-calculator";

export function SimulatorView({
  amount,
  months,
  birthDate,
  result,
  isFormValid,
  isLoading,
  onAmountChange,
  onMonthsChange,
  onBirthDateChange,
  onSubmit,
  onClear,
}: SimulatorProps) {
  const showSkeleton = isLoading;

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
        disabled={isLoading}
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            { display: "none" },
          "& input[type=number]": { MozAppearance: "textfield" },
        }}
      />

      <TextField
        label="Prazo (em meses)"
        type="number"
        value={months}
        onChange={(e) => onMonthsChange(e.target.value)}
        required
        disabled={isLoading}
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            { display: "none" },
          "& input[type=number]": { MozAppearance: "textfield" },
        }}
      />

      <TextField
        label="Data de Nascimento"
        type="date"
        value={birthDate}
        onChange={(e) => onBirthDateChange(e.target.value)}
        required
        disabled={isLoading}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: new Date().toISOString().split("T")[0] }}
      />

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isFormValid || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? "Calculando..." : "Simular"}
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="large"
          onClick={onClear}
          disabled={isLoading}
        >
          Limpar
        </Button>
      </Stack>

      {(showSkeleton || result) && (
        <Card sx={{ marginTop: 2, backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resultado da Simulação
            </Typography>

            {showSkeleton && (
              <Stack spacing={1}>
                <Skeleton width="60%" />
                <Skeleton width="80%" />
                <Skeleton width="70%" />
                <Skeleton width="50%" />
              </Stack>
            )}

            {!showSkeleton && result && (
              <>
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
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
