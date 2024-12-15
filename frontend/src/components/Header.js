import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#141414", boxShadow: "none" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ color: "#E50914", fontWeight: "bold" }}>
          Beats Headphones
        </Typography>
        <Button color="inherit" sx={{ marginLeft: "auto" }} onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;