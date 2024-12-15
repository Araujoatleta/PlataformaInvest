import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled, keyframes } from "@mui/system";

// Keyframes para animação de fade-in com zoom
const fadeInZoom = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Estilos principais baseados no layout Netflix
const RootContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#141414",
  color: "#EDEDED",
  display: "flex",
  flexDirection: "column",
  animation: `${fadeInZoom} 1s ease-out`, // Animação aplicada ao carregar
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#141414",
  boxShadow: "none",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  color: "#E50914", // Vermelho Netflix
});

const FilterContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
  gap: "1rem",
  flexWrap: "wrap",
});

const HoverCard = styled(Card)({
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
  backgroundColor: "#1F1F1F",
  color: "#EDEDED",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.8)",
  },
});

const ButtonStyled = styled(Button)({
  backgroundColor: "#E50914",
  color: "#FFFFFF",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#B20710",
    transform: "scale(1.05)",
    boxShadow: "0 0 10px rgba(229, 9, 20, 0.8)",
  },
});

const Dashboard = () => {
  const [fiis, setFiis] = useState([]);
  const [filters, setFilters] = useState({
    segmento: "",
    pesquisa: "",
  });
  const [stats, setStats] = useState({
    totalFiis: 0,
    mediaCotacao: 0,
    mediaVacancia: 0,
  });

  useEffect(() => {
    fetchFiis();
  }, []);

  const fetchFiis = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fiis");
      const data = await response.json();
      setFiis(data);
      calcularEstatisticas(data);
    } catch (error) {
      toast.error("Erro ao carregar FIIs");
    }
  };

  const calcularEstatisticas = (fiisData) => {
    const total = fiisData.length;

    const mediaCotacao =
      fiisData.reduce((sum, fii) => sum + (parseFloat(fii.cotacao) || 0), 0) /
        total || 0;

    const mediaVacancia =
      fiisData.reduce(
        (sum, fii) => sum + (parseFloat(fii.vacancia_media) || 0),
        0
      ) / total || 0;

    setStats({
      totalFiis: total,
      mediaCotacao: mediaCotacao.toFixed(2),
      mediaVacancia: mediaVacancia.toFixed(2),
    });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <RootContainer>
      {/* Barra Superior */}
      <StyledAppBar position="static">
        <Toolbar>
          <Title variant="h6">Dashboard de FIIs</Title>
        </Toolbar>
      </StyledAppBar>

      <ToastContainer />

      {/* Filtros */}
      <Box sx={{ padding: "2rem" }}>
        <FilterContainer>
          <TextField
            label="Pesquisar FII"
            name="pesquisa"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          />
          <Select
            displayEmpty
            name="segmento"
            value={filters.segmento}
            onChange={handleFilterChange}
            size="small"
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px" }}
          >
            <MenuItem value="">Todos Segmentos</MenuItem>
            <MenuItem value="Lajes Corporativas">Lajes Corporativas</MenuItem>
            <MenuItem value="Shoppings">Shoppings</MenuItem>
          </Select>
          <ButtonStyled onClick={fetchFiis} variant="contained">
            Filtrar
          </ButtonStyled>
        </FilterContainer>

        {/* Estatísticas */}
        <Grid container spacing={3}>
          {[ 
            { label: "Total de FIIs", value: stats.totalFiis },
            { label: "Média de Cotação", value: `R$ ${stats.mediaCotacao}` },
            { label: "Média de Vacância", value: `${stats.mediaVacancia}%` },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <HoverCard>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{item.label}</Typography>
                  <Typography variant="h3" sx={{ color: "#E50914" }}>
                    {item.value}
                  </Typography>
                </CardContent>
              </HoverCard>
            </Grid>
          ))}
        </Grid>

        {/* Gráfico */}
        <Box sx={{ marginTop: "2rem" }}>
          <HoverCard>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Liquidez dos FIIs
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fiis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="nome" tick={{ fill: "#EDEDED" }} />
                  <YAxis tick={{ fill: "#EDEDED" }} />
                  <Tooltip
                    contentStyle={{ background: "#333", color: "#FFFFFF" }}
                  />
                  <Bar dataKey="liquidez" fill="#E50914" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </HoverCard>
        </Box>
      </Box>
    </RootContainer>
  );
};

export default Dashboard;
