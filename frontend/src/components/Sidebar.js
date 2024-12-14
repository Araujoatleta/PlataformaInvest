import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalculateIcon from "@mui/icons-material/Calculate";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen); // Alterna o estado do Drawer de forma segura
  };

  // Função para fechar o Drawer
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} sx={{ color: "#ffffff", backgroundColor: "#1c1c1c", margin: "1rem", "&:hover": { backgroundColor: "#3a3a3a" } }}>
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer} sx={{ "& .MuiDrawer-paper": { background: "linear-gradient(180deg, #0d0d0d, #1c1c1c, #3a3a3a)", color: "white", width: 250, border: "none" } }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={closeDrawer}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/company-filter" onClick={closeDrawer}>
              <ListItemIcon>
                <FilterAltIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Filtros FIIs" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/investment-calculator" onClick={closeDrawer}>
              <ListItemIcon>
                <CalculateIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Calculadora" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/add-fii" onClick={closeDrawer}>
              <ListItemIcon>
                <AddCircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Adicionar FII" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;