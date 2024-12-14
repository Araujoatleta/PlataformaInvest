import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import ParentComponent from './ParentComponent';
// Agora você vai renderizar o ParentComponent no lugar de AddFii
<ParentComponent />

const MainLayout = ({ children, onLogout }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Menu lateral */}
      <Sidebar onLogout={onLogout} />
      {/* Conteúdo da página */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;