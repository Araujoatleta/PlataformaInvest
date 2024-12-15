import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <h1>FIIs</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/company-filter">Filtros</Link>
        <Link to="/investment-calculator">Calculadora</Link>
        <Link to="/add-fii">Adicionar FII</Link>
        <button className="btn-primary" onClick={onLogout} style={{ marginLeft: "1rem" }}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Navbar;