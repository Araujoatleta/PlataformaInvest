import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion } from "framer-motion";
import './Login.css';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  padding: theme.spacing(2),
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
  borderRadius: "12px",
}));

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      onLogin();
    } else {
      alert(data.message || "Erro desconhecido");
    }
  };

  return (
    <div className="login-background">
      {/* Animação de entrada do Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StyledCard>
          <CardContent>
            {/* Ícone animado */}
            <Box display="flex" justifyContent="center" mb={2}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <LockOutlinedIcon fontSize="large" color="primary" />
              </motion.div>
            </Box>

            <Typography variant="h5" align="center" gutterBottom>
              Bem-vindo
            </Typography>
            <form onSubmit={handleLogin}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                {/* Botão animado */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Entrar
                  </Button>
                </motion.div>
              </Box>
            </form>
          </CardContent>
        </StyledCard>
      </motion.div>
    </div>
  );
};

export default Login;