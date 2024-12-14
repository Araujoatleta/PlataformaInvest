// src/components/InvestmentCalculator.js
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const InvestmentCalculator = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(null);

  const calculateTotal = () => {
    setTotal(quantity * price);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Calculadora de Investimentos
      </Typography>

      <TextField
        label="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Preço por Ação"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={calculateTotal}
        sx={{ marginTop: 2 }}
      >
        Calcular
      </Button>

      {total !== null && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total: R${total}
        </Typography>
      )}
    </Box>
  );
};

export default InvestmentCalculator;