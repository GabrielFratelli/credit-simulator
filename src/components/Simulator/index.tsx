import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";

export function Simulator() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // cálculo vem depois
  };

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: 3,
        boxShadow: 2,
        borderRadius: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5">Simulador de Crédito</Typography>

      <TextField
        label="Valor do Empréstimo"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <TextField
        label="Prazo (em meses)"
        type="number"
        value={months}
        onChange={(e) => setMonths(e.target.value)}
        required
      />

      <TextField
        label="Data de Nascimento"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />

      <Button type="submit" variant="contained">
        Simular
      </Button>
    </Stack>
  );
}
