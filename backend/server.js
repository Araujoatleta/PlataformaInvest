const express = require('express');
const cors = require('cors'); // Para permitir requisições de outras origens
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Permitir requisições de qualquer origem
app.use(cors());
app.use(express.json()); // Para lidar com JSON no corpo da requisição

// Simulação de um banco de dados para login
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({ message: 'Login bem-sucedido!', token: 'fake-jwt-token' });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas!' });
  }
});

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./fiis.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criação da tabela FIIs, se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS fiis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    pvp REAL,
    liquidez REAL,
    qtd_imoveis INTEGER,
    vacancia_media REAL,
    cotacao REAL
  )
`);

// Rota: Adicionar um novo FII
app.post('/api/fiis/add', (req, res) => {
  const { nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao } = req.body;

  const query = `
    INSERT INTO fiis (nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao], function(err) {
    if (err) {
      console.error('Erro ao adicionar FII:', err.message);
      return res.status(500).json({ message: 'Erro ao adicionar o FII' });
    }
    res.status(201).json({
      message: 'FII adicionado com sucesso!',
      id: this.lastID
    });
  });
});

// Rota: Deletar um FII pelo ID
app.delete('/api/fiis/delete/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM fiis WHERE id = ?`, [id], function(err) {
    if (err) {
      console.error('Erro ao deletar FII:', err.message);
      return res.status(500).json({ message: 'Erro ao deletar o FII' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'FII não encontrado' });
    }

    res.status(200).json({ message: 'FII deletado com sucesso!' });
  });
});

// Rota: Listar todos os FIIs
app.get('/api/fiis', (req, res) => {
  db.all(`SELECT * FROM fiis`, [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar FIIs:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar os FIIs' });
    }
    res.status(200).json(rows);
  });
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});