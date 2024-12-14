const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho correto do arquivo
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);
    console.log("Tabela 'users' criada com sucesso!");
    db.run(`
        CREATE TABLE IF NOT EXISTS fiis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valor REAL NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Erro ao criar tabela 'fiis':", err.message);
        } else {
            console.log("Tabela 'fiis' criada com sucesso!");
        }
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            sector TEXT NOT NULL
        )
    `);
    console.log("Tabela 'companies' criada com sucesso!");
});

// Fechar conexão
db.close((err) => {
    if (err) {
        console.error('Erro ao fechar o banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados fechada.');
    }
});