import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";

// Estilos
const BackgroundContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #141414, #0D0D0D)", // Fundo sólido degradê Netflix
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
});

const StyledCard = styled(Card)({
  padding: "3rem 2.5rem",
  borderRadius: "12px",
  backgroundColor: "#1F1F1F", // Fundo mais escuro
  color: "#FFFFFF",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.7)",
  maxWidth: "450px",
  width: "100%",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  backgroundColor: "#E50914", // Vermelho Netflix
  color: "#FFFFFF",
  fontWeight: "bold",
  padding: "1rem",
  fontSize: "1.1rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#B20710", // Vermelho mais escuro no hover
    transform: "scale(1.05)",
    transition: "transform 0.3s ease",
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "1.5rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#444", // Borda padrão
    },
    "&:hover fieldset": {
      borderColor: "#E50914", // Borda no hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E50914", // Borda no foco
    },
    borderRadius: "8px",
    backgroundColor: "#333", // Fundo do campo input
  },
  "& .MuiInputLabel-root": {
    color: "#AAA",
    "&.Mui-focused": {
      color: "#E50914", // Cor do label no foco
    },
  },
  input: {
    color: "#FFFFFF",
    fontSize: "1.1rem",
    padding: "1rem",
  },
});

const Title = styled(Typography)({
  color: "#E50914",
  fontWeight: "bold",
  fontSize: "2.5rem",
  marginBottom: "1.5rem",
  letterSpacing: "1px",
});

const Subtitle = styled(Typography)({
  color: "#AAAAAA",
  marginBottom: "2rem",
  fontSize: "1rem",
});

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      toast.success("Login realizado com sucesso!");
      localStorage.setItem("token", "your_token_value");
      onLogin();
      navigate("/dashboard");
    } else {
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <BackgroundContainer>
      <StyledCard>
        <CardContent>
          <Title>Login</Title>
          <Subtitle>Entre com suas credenciais para acessar</Subtitle>
          <form onSubmit={handleLogin}>
            <StyledTextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <StyledTextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <StyledButton
              fullWidth
              variant="contained"
              type="submit"
            >
              Entrar
            </StyledButton>
          </form>
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default Login;