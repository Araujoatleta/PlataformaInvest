const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite3");

// Cria a tabela se ela não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS fiis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL,
      segment TEXT NOT NULL,
      dividendYield REAL NOT NULL
    )
  `);
});

// Rota para adicionar FIIs ao banco de dados
router.post("/fiis", (req, res) => {
  const { code, segment, dividendYield } = req.body;

  if (!code || !segment || !dividendYield) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const query = 'INSERT INTO fiis (code, segment, dividendYield) VALUES (?, ?, ?)';

  db.run(query, [code, segment, dividendYield], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erro ao adicionar FII.", error: err.message });
    }
    return res.status(201).json({ message: "FII adicionado com sucesso!", id: this.lastID });
  });
});

// Rota para buscar todos os FIIs do banco de dados
router.get("/fiis", (req, res) => {
  db.all("SELECT * FROM fiis", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar FIIs.", error: err.message });
    }
    return res.json(rows);
  });
});

module.exports = router;