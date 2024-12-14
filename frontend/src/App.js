import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CompanyFilter from "./components/CompanyFilter";
import InvestmentCalculator from "./components/InvestmentCalculator";
import AddFii from "./components/AddFii";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verificar se o token existe e manter a autenticação
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Não redirecionar diretamente para o Dashboard, pois já estamos na página
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Função para login, setando o estado de autenticação
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "your_token_value"); // Simulando token no localStorage
    navigate("/dashboard"); // Redireciona para a Dashboard após login
  };

  // Função de logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Removendo o token do localStorage
    navigate("/login");
  };

  return (
    <>
      {/* Exibe o Sidebar somente se o usuário estiver autenticado */}
      {isAuthenticated && <Sidebar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/company-filter"
          element={isAuthenticated ? <CompanyFilter /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/investment-calculator"
          element={isAuthenticated ? <InvestmentCalculator /> : <Login onLogin={handleLogin} />}
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