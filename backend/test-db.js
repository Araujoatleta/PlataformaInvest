const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

// Cria a tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS fiis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL,
      segment TEXT NOT NULL,
      dividendYield REAL NOT NULL
    )
  `);

  console.log("Tabela 'fiis' criada com sucesso!");

  db.close();
});