import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalculateIcon from "@mui/icons-material/Calculate";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redireciona para a tela de login
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1E1E2F", // Fundo escuro futurista
          color: "#fff", // Cor do texto
        },
      }}
    >
      {/* Logo / Título */}
      <Typography
        variant="h6"
        sx={{
          p: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          letterSpacing: "1px",
          borderBottom: "1px solid #333",
        }}
      >
        FII Manager
      </Typography>

      {/* Lista de Links */}
      <List sx={{ paddingTop: 0 }}>
        <ListItemButton
          component={Link}
          to="/dashboard"
          sx={{
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <ListItemIcon>
            <DashboardIcon style={{ color: "#62d2a2" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/company-filter"
          sx={{
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <ListItemIcon>
            <FilterAltIcon style={{ color: "#62d2a2" }} />
          </ListItemIcon>
          <ListItemText primary="Filtros FIIs" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/add-fii"
          sx={{
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <ListItemIcon>
            <AddCircleIcon style={{ color: "#62d2a2" }} />
          </ListItemIcon>
          <ListItemText primary="Adicionar FII" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/investment-calculator"
          sx={{
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          <ListItemIcon>
            <CalculateIcon style={{ color: "#62d2a2" }} />
          </ListItemIcon>
          <ListItemText primary="Calculadora de Investimento" />
        </ListItemButton>

        <Divider sx={{ my: 2, backgroundColor: "#555" }} />

        {/* Botão de Logout */}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            "&:hover": { backgroundColor: "#e57373" },
          }}
        >
          <ListItemIcon>
            <LogoutIcon style={{ color: "#e57373" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      {/* Rodapé */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#aaa",
        }}
      >
        © 2024 FII Manager
      </Typography>
    </Drawer>
  );
};

export default Sidebar;