import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  Typography,
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
import { styled } from "@mui/system";

// Estilos
const RootContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #141414, #1C1C1C)",
  color: "#EDEDED",
  padding: "2rem",
});

const HoverCard = styled(Box)({
  backgroundColor: "#1F1F1F",
  color: "#FFFFFF",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  padding: "1.5rem",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ButtonStyled = styled(Button)({
  backgroundColor: "#E50914",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#B20710",
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
      <ToastContainer />

      {/* Filtros */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Pesquisar FII"
          name="pesquisa"
          variant="outlined"
          size="small"
          onChange={handleFilterChange}
          sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px", flex: 1 }}
        />
        <Select
          displayEmpty
          name="segmento"
          value={filters.segmento}
          onChange={handleFilterChange}
          size="small"
          sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px", flex: 1 }}
        >
          <MenuItem value="">Todos Segmentos</MenuItem>
          <MenuItem value="Lajes Corporativas">Lajes Corporativas</MenuItem>
          <MenuItem value="Shoppings">Shoppings</MenuItem>
        </Select>
        <ButtonStyled onClick={fetchFiis} variant="contained">
          Filtrar
        </ButtonStyled>
      </Box>

      {/* Estatísticas */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Total de FIIs", value: stats.totalFiis },
          { label: "Média de Cotação", value:` R$ ${stats.mediaCotacao} `},
          { label: "Média de Vacância", value: `${stats.mediaVacancia}% `},
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <HoverCard>
              <Typography variant="h6" gutterBottom>
                {item.label}
              </Typography>
              <Typography variant="h3" sx={{ color: "#E50914" }}>
                {item.value}
              </Typography>
            </HoverCard>
          </Grid>
        ))}
      </Grid>

      {/* Gráfico */}
      <HoverCard>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Liquidez dos FIIs
        </Typography><ResponsiveContainer width="100%" height={300}>
          <BarChart data={fiis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#666" />
            <XAxis dataKey="nome" tick={{ fill: "#EDEDED" }} />
            <YAxis tick={{ fill: "#EDEDED" }} />
            <Tooltip contentStyle={{ background: "#333", color: "#FFFFFF" }} />
            <Bar dataKey="liquidez" fill="#E50914" />
          </BarChart>
        </ResponsiveContainer>
      </HoverCard>
    </RootContainer>
  );
};

export default Dashboard;