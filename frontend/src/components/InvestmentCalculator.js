import React, { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";

const InvestmentCalculator = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(null);

  const calculateTotal = () => {
    setTotal(quantity * price);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <Card sx={{ backgroundColor: "#1F1F1F", color: "#FFFFFF", padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Calculadora de Investimentos
          </Typography>
          <TextField
            label="Quantidade"
            type="number"
            variant="outlined"
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <TextField
            label="Preço por Ação"
            type="number"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <Button variant="contained" color="error" onClick={calculateTotal} sx={{ marginTop: 2 }}>
            Calcular
          </Button>
          {total !== null && (
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Total: R${total}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default InvestmentCalculator;