import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";  // Navegação no topo (novo menu)
import Dashboard from "./components/Dashboard";
import CompanyFilter from "./components/CompanyFilter";
import InvestmentCalculator from "./components/InvestmentCalculator";
import AddFii from "./components/AddFii";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Função de login que define a autenticação e redireciona o usuário
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "your_token_value"); // Armazenando um token fictício
    navigate("/dashboard"); // Redireciona imediatamente após login
  };

  // Função de logout que remove o token e redireciona para login
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  return (
    <>
      {/* Se o usuário estiver autenticado, exibe o Navbar (menu superior) */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

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