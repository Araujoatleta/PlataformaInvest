import React, { useState } from "react";
import { TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

// Estilos
const BackgroundContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #141414, #0D0D0D)", // Fundo degradê Netflix
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
});

const StyledCard = styled(Card)({
  padding: "2.5rem",
  borderRadius: "12px",
  backgroundColor: "#1F1F1F", // Fundo mais escuro
  color: "#FFFFFF",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.7)",
  maxWidth: "450px",
  width: "100%",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  backgroundColor: "#E50914", // Vermelho Netflix
  color: "#FFFFFF",
  fontWeight: "bold",
  padding: "0.8rem",
  fontSize: "1.1rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#B20710",
    transform: "scale(1.05)",
    transition: "transform 0.3s ease",
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "1.5rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#444", // Borda padrão
    },
    "&:hover fieldset": {
      borderColor: "#E50914", // Borda no hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E50914", // Borda no foco
    },
    borderRadius: "8px",
    backgroundColor: "#333", // Fundo do campo input
  },
  "& .MuiInputLabel-root": {
    color: "#AAA",
    "&.Mui-focused": {
      color: "#E50914", // Cor do label no foco
    },
  },
  input: {
    color: "#FFFFFF",
    fontSize: "1.1rem",
    padding: "1rem",
  },
});

const Title = styled(Typography)({
  color: "#E50914",
  fontWeight: "bold",
  fontSize: "2rem",
  marginBottom: "1rem",
});

const InvestmentCalculator = () => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(null);

  const calculateTotal = () => {
    setTotal(quantity * price);
  };

  return (
    <BackgroundContainer>
      <StyledCard>
        <CardContent>
          <Title>Calculadora de Investimentos</Title>

          <StyledTextField
            label="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            fullWidth
          />

          <StyledTextField
            label="Preço por Ação"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            fullWidth
          />

          <StyledButton fullWidth variant="contained" onClick={calculateTotal}>
            Calcular
          </StyledButton>

          {total !== null && (
            <Typography variant="h6" sx={{ marginTop: "2rem", color: "#E50914" }}>
              Total: R$ {total}
            </Typography>
          )}
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default InvestmentCalculator;