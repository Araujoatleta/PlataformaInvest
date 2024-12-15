import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // Menu superior
import Dashboard from "./components/Dashboard";
import CompanyFilter from "./components/CompanyFilter";
import InvestmentCalculator from "./components/InvestmentCalculator";
import AddFii from "./components/AddFii";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Para verificar a rota atual

  // Verifica a autenticação ao iniciar o projeto
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login"); // Redireciona para login se não estiver autenticado
    }
  }, [navigate]);

  // Função de Login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "your_token_value"); // Simula um token
    navigate("/dashboard");
  };

  // Função de Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar só aparece se o usuário estiver autenticado e não estiver na rota de login */}
      {isAuthenticated && location.pathname !== "/login" && (
        <Navbar onLogout={handleLogout} />
      )}

      <Routes>
        {/* Página de Login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Páginas protegidas */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/company-filter"
          element={
            isAuthenticated ? <CompanyFilter /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/investment-calculator"
          element={
            isAuthenticated ? (
              <InvestmentCalculator />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/add-fii"
          element={isAuthenticated ? <AddFii /> : <Login onLogin={handleLogin} />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;