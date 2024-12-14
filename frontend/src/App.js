import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CompanyFilter from "./components/CompanyFilter";
import InvestmentCalculator from "./components/InvestmentCalculator";
import MainLayout from "./components/MainLayout";
import AddFii from "./components/AddFii";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userToken) => {
    localStorage.setItem("token", userToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route
              path="/"
              element={
                <MainLayout onLogout={handleLogout}>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <MainLayout onLogout={handleLogout}>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/company-filter"
              element={
                <MainLayout onLogout={handleLogout}>
                  <CompanyFilter />
                </MainLayout>
              }
            />
            <Route
              path="/add-fii"
              element={
                <MainLayout onLogout={handleLogout}>
                  <AddFii />
                </MainLayout>
              }
            />
            <Route
              path="/investment-calculator"
              element={
                <MainLayout onLogout={handleLogout}>
                  <InvestmentCalculator />
                </MainLayout>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;