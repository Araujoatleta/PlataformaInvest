import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Invest
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/company-filter">
          Filtros FIIs
        </Button>
        <Button color="inherit" component={Link} to="/investment-calculator">
          Calculadora
        </Button>
        <Button color="inherit" component={Link} to="/add-fii">
          Adicionar FII
        </Button>
        <Button color="inherit" onClick={onLogout}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;