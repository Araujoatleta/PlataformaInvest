// routes/portfolio.js
const express = require('express');
const router = express.Router();

// Supondo que você tenha uma lista de carteiras de investimentos simples
let portfolio = [
  { id: 1, name: "Ação XYZ", amount: 100, price: 10.5 },
  { id: 2, name: "Fundo Imobiliário ABC", amount: 50, price: 30.0 }
];

// Rota para obter a carteira
router.get("/", (req, res) => {
  res.json(portfolio);
});

// Rota para adicionar um novo ativo à carteira
router.post("/", (req, res) => {
  const { name, amount, price } = req.body;
  const newAsset = { id: portfolio.length + 1, name, amount, price };
  portfolio.push(newAsset);
  res.status(201).json(newAsset);
});

module.exports = router;