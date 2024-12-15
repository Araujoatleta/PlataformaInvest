const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios'); // Importa o Axios para requisições HTTP
const app = express();

// Permitir requisições de qualquer origem
app.use(cors());
app.use(express.json()); // Para lidar com JSON no corpo da requisição

// Simulação de um banco de dados para login
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

// Rota de login - Simulação de login básico
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Simulação simples de verificação de login
  if (username === 'admin' && password === 'admin123') {
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
    cotacao REAL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Função para buscar os FIIs de uma API externa
const fetchFiisFromApi = async () => {
  try {
    // Substitua esta URL pela URL real da API que fornece os dados dos FIIs
    const response = await axios.get('https://api.exemplo.com/fiis'); // Use sua API real aqui.

    const fiisData = response.data.map(fii => ({
      nome: fii.nome,
      pvp: fii.pvp,
      liquidez: fii.liquidez,
      qtd_imoveis: fii.qtd_imoveis,
      vacancia_media: fii.vacancia_media,
      cotacao: fii.cotacao
    }));

    return fiisData;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error.message);
    return [];
  }
};

// Função para atualizar os FIIs no banco de dados
const updateFiisData = async () => {
  const fiis = await fetchFiisFromApi();

  if (fiis.length > 0) {
    fiis.forEach(fii => {
      const query = `
        INSERT OR REPLACE INTO fiis (nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.run(query, [fii.nome, fii.pvp, fii.liquidez, fii.qtd_imoveis, fii.vacancia_media, fii.cotacao], (err) => {
        if (err) {
          console.error('Erro ao atualizar FII:', err.message);
        }
      });
    });

    console.log('FIIs atualizados com sucesso!');
  } else {
    console.log('Nenhum dado de FII disponível para atualização.');
  }
};

// Atualizar FIIs a cada 30 minutos (1800000ms)
setInterval(updateFiisData, 1800000); // Executa a cada 30 minutos

// Rota: Listar todos os FIIs
app.get('/api/fiis', (req, res) => {
  db.all('SELECT * FROM fiis', [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar FIIs:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar os FIIs' });
    }
    res.status(200).json(rows);
  });
});

// Rota: Adicionar um novo FII
app.post('/api/fiis/add', (req, res) => {
  const { nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao } = req.body;

  const query = `
    INSERT INTO fiis (nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [nome, pvp, liquidez, qtd_imoveis, vacancia_media, cotacao], function (err) {
    if (err) {
      console.error('Erro ao adicionar FII:', err.message);
      return res.status(500).json({ message: 'Erro ao adicionar o FII' });
    }
    res.status(201).json({
      message: 'FII adicionado com sucesso!',
      id: this.lastID,
    });
  });
});

// Rota: Deletar um FII pelo ID
app.delete('/api/fiis/delete/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM fiis WHERE id = ?', [id], function (err) {if (err) {
    console.error('Erro ao deletar FII:', err.message);
    return res.status(500).json({ message: 'Erro ao deletar o FII' });
  }

  if (this.changes === 0) {
    return res.status(404).json({ message: 'FII não encontrado' });
  }

  res.status(200).json({ message: 'FII deletado com sucesso!' });
});
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});