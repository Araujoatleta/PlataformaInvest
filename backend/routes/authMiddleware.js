const jwt = require("jsonwebtoken");

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Token enviado no cabeçalho

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido!" });
  }

  try {
    const decoded = jwt.verify(token, "secreta"); // Substitua "secreta" por uma chave forte
    req.user = decoded; // Adiciona os dados do usuário na requisição
    next(); // Continua para a próxima etapa
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};

module.exports = verifyToken;