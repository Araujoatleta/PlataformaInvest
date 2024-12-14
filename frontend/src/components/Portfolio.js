// src/components/Portfolio.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, List, ListItem, ListItemText, Box } from "@mui/material";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  // Fetch da carteira de investimentos
  useEffect(() => {
    fetch("http://localhost:5000/api/portfolio")
      .then((res) => res.json())
      .then((data) => setPortfolio(data));
  }, []);

  // Função para adicionar um ativo à carteira
  const addAsset = async () => {
    const response = await fetch("http://localhost:5000/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount, price }),
    });

    const newAsset = await response.json();
    setPortfolio([...portfolio, newAsset]);
    setName("");
    setAmount(0);
    setPrice(0);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Acompanhamento da Carteira de Investimentos
      </Typography>

      <List>
        {portfolio.map((asset) => (
          <ListItem key={asset.id}>
            <ListItemText
              primary={asset.name}
              secondary={`Quantidade: ${asset.amount} | Preço: R$${asset.price}`}
            />
          </ListItem>
        ))}
      </List>

      <TextField
        label="Nome do Ativo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantidade"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addAsset}
        sx={{ marginTop: 2 }}
      >
        Adicionar Ativo
      </Button>
    </Box>
  );
};

export default Portfolio;