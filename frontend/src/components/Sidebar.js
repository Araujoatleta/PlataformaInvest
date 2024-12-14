import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import { Menu as MenuIcon, Dashboard as DashboardIcon, FilterAlt as FilterAltIcon, AddCircle as AddCircleIcon, Calculate as CalculateIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redireciona para a tela de login
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={`sidebar-container ${open ? 'open' : 'closed'}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        <MenuIcon />
      </div>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #121212, #333333)", // Gradiente
          },
        }}
      >
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <DashboardIcon />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/company-filter")}>
            <FilterAltIcon />
            <ListItemText primary="Filtros FIIs" />
          </ListItem>
          <ListItem button onClick={() => navigate("/add-fii")}>
            <AddCircleIcon />
            <ListItemText primary="Adicionar FII" />
          </ListItem>
          <ListItem button onClick={() => navigate("/investment-calculator")}>
            <CalculateIcon />
            <ListItemText primary="Calculadora de Investimento" />
          </ListItem>
          <ListItem>
            <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;