import React, { useState } from "react";   
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";   
import { styled } from "@mui/system";   
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";   
import { toast } from "react-toastify";   
import { useNavigate } from "react-router-dom";  
import 'react-toastify/dist/ReactToastify.css';   
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
  const navigate = useNavigate(); // Hook de navegação  
 
  const handleLogin = async (e) => {   
    e.preventDefault(); 
 
    const response = await fetch("http://localhost:5000/api/login", {   
      method: "POST",   
      headers: { "Content-Type": "application/json" },   
      body: JSON.stringify({ username, password }),   
    });  
 
    const data = await response.json();  
 
    if (response.ok) {  
      // Exibir animação de sucesso ao logar  
      toast.success('Login realizado com sucesso!', {  
        position: "top-center",  
        autoClose: 3000,  
        hideProgressBar: true,  
        closeOnClick: true,  
        draggable: true,  
        progress: undefined,  
      }); 
 
      localStorage.setItem("token", data.token); 
 
      // Iniciar a animação de zoom espiral  
      onLogin();  
 
      // Redirecionar para o dashboard após login  
      navigate('/dashboard');  
    } else {  
      // Exibir mensagem de erro se as credenciais forem incorretas  
      toast.error("Jogador Caro, coloque a senha ou Email corretos!", {  
        position: "top-center",  
        autoClose: 3000,  
        hideProgressBar: true,  
        closeOnClick: true,  
        draggable: true,  
        progress: undefined,  
      });  
    }  
  };  
 
  return (  
    <div className="login-background">  
      <StyledCard>  
        <CardContent>  
          <Box display="flex" justifyContent="center" mb={2}>  
            <LockOutlinedIcon fontSize="large" color="primary" />  
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
              <Button variant="contained" color="primary" size="large" type="submit" fullWidth>  
                Entrar  
              </Button>  
            </Box>  
          </form>  
        </CardContent>  
      </StyledCard>  
    </div>  
  );  
};  
 
export default Login;