const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho absoluto para o banco de dados existente
const dbPath = "C:/Users/user/Desktop/updated_project/backend/database.sqlite3";

// Conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err.message);
  } else {
    console.log(`Conectado ao banco de dados SQLite no caminho: ${dbPath}`);
  }
});

module.exports = db;