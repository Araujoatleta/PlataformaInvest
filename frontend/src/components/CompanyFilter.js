import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

// Estilização global
const RootContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#141414",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  paddingTop: "5rem", // Adiciona espaço abaixo do Navbar
});

const Title = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#E50914",
  marginBottom: "1.5rem",
  textAlign: "center",
});

const FiltersContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  gap: "1rem",
  flexWrap: "wrap",
  marginBottom: "1rem",
  padding: "1rem",
  backgroundColor: "#1F1F1F",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "1200px",
});

const FilterField = styled(TextField)({
  backgroundColor: "#333",
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#E50914" },
    "&.Mui-focused fieldset": { borderColor: "#E50914" },
  },
  input: { color: "#fff" },
  "& label": { color: "#aaa" },
  "& .Mui-focused": { color: "#fff" },
});

const StyledButton = styled(Button)({
  backgroundColor: "#E50914",
  color: "#fff",
  "&:hover": { backgroundColor: "#B20710" },
  fontSize: "1rem",
  padding: "0.5rem 2rem",
  borderRadius: "4px",
});

// Tabela com rolagem interna
const ScrollableTableContainer = styled(TableContainer)({
  backgroundColor: "#1F1F1F",
  borderRadius: "8px",
  maxHeight: "400px",
  overflowY: "auto",
  width: "100%",
  maxWidth: "1200px",
});

const StyledTableCell = styled(TableCell)({
  color: "#fff",
  fontWeight: "bold",
  backgroundColor: "#333",
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": { backgroundColor: "#2A2A2A" },
  "&:hover": { backgroundColor: "#444" },
});

const CompanyFilter = () => {
  const [fiis, setFiis] = useState([]); // Lista completa dos FIIs
  const [filteredFiis, setFilteredFiis] = useState([]); // Resultados filtrados
  const [filters, setFilters] = useState({ nome: "" });

  // Carregar todos os FIIs ao iniciar
  useEffect(() => {
    fetchAllFiis();
  }, []);

  const fetchAllFiis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fiis");
      setFiis(response.data);
      setFilteredFiis(response.data);
    } catch (error) {
      console.error("Erro ao buscar FIIs:", error.message);
    }
  };

  // Buscar no backend (rota /api/fiis) e aplicar o filtro
  const handleFetchAndFilter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fiis");
      const allFiis = response.data;

      // Aplica filtro baseado no nome
      const filtered = allFiis.filter((fii) =>
        fii.nome.toLowerCase().includes(filters.nome.toLowerCase())
      );

      setFilteredFiis(filtered); // Atualiza a tabela com os dados filtrados
    } catch (error) {
      console.error("Erro ao buscar FIIs:", error.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <RootContainer>
      <Title>Filtros de FIIs</Title>

      {/* Filtros */}
      <FiltersContainer>
        <FilterField
          label="Nome do FII"
          name="nome"
          variant="outlined"
          size="small"
          onChange={handleFilterChange}
        />
        <StyledButton onClick={handleFetchAndFilter}>Buscar</StyledButton>
      </FiltersContainer>

      {/* Tabela */}
      <ScrollableTableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="right">Cotação</StyledTableCell>
              <StyledTableCell align="right">Dividend Rate</StyledTableCell><StyledTableCell align="right">Market Cap</StyledTableCell>
              <StyledTableCell align="right">Volume Médio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiis.map((fii, index) => (
              <StyledTableRow key={index}>
                <TableCell>{fii.nome}</TableCell>
                <TableCell align="right">R$ {fii.cotacao}</TableCell>
                <TableCell align="right">{fii.dividendRate}</TableCell>
                <TableCell align="right">{fii.marketCap}</TableCell>
                <TableCell align="right">{fii.avgVolume10d}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableTableContainer>
    </RootContainer>
  );
};

export default CompanyFilter;