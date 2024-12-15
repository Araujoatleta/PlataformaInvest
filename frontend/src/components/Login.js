import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/global.css"; // Importa o estilo global

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="card" style={{ width: "400px", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#E50914" }}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="btn-primary" style={{ width: "100%" }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;