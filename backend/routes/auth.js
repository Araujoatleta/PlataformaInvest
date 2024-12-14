// No seu arquivo server.js ou app.js (backend)
const express = require('express');
const app = express();
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});