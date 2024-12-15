import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  Grid, 
  Box, 
  Typography, 
  CircularProgress
} from "@mui/material"; 
import { styled } from "@mui/system"; 

// Estilo global inspirado no Netflix
const RootContainer = styled(Box)({ 
  minHeight: "100vh", 
  margin: 0, 
  padding: 0, 
  backgroundColor: "#141414", // Cor do background da Netflix 
  color: "#fff", 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "flex-start", 
  gap: "1rem", 
}); 

// Título estilizado
const Title = styled(Typography)({ 
  fontSize: "2rem", 
  fontWeight: "bold", 
  marginTop: "1rem", 
  color: "#E50914", // Vermelho Netflix 
}); 

// Container dos Filtros
const FiltersContainer = styled(Box)({ 
  display: "flex", 
  justifyContent: "center", 
  gap: "1rem", 
  flexWrap: "wrap", 
  marginBottom: "1rem", 
  width: "100%", 
  padding: "0 1rem", 
}); 

// Campos de filtro
const FilterField = styled(TextField)({ 
  backgroundColor: "#333333", 
  borderRadius: "4px", 
  input: { color: "#fff" }, 
  "& .MuiOutlinedInput-root": { 
    "& fieldset": { borderColor: "#555" }, 
    "&:hover fieldset": { borderColor: "#E50914" }, 
    "&.Mui-focused fieldset": { borderColor: "#E50914" }, 
  }, 
}); 

// Botão de busca
const StyledButton = styled(Button)({ 
  backgroundColor: "#E50914", 
  color: "#fff", 
  "&:hover": { 
    backgroundColor: "#B20710", 
  }, 
  textTransform: "none", 
  fontSize: "1rem", 
}); 

// Tabela
const StyledTableContainer = styled(TableContainer)({ 
  backgroundColor: "#1F1F1F", 
  width: "90%", 
  borderRadius: "8px", 
}); 

const StyledTableCell = styled(TableCell)({ 
  color: "#fff", 
  fontWeight: "bold", 
  borderBottom: "1px solid #333", 
}); 

const StyledTableRow = styled(TableRow)({ 
  "&:nth-of-type(odd)": { 
    backgroundColor: "#333333", 
  }, 
}); 

const CompanyFilter = () => { 
  const [fiis, setFiis] = useState([]); 
  const [filteredFiis, setFilteredFiis] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [pvpMin, setPvpMin] = useState(""); 
  const [pvpMax, setPvpMax] = useState(""); 
  const [segmento, setSegmento] = useState(""); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => { 
    const fetchData = async () => { 
      setLoading(true);
      try { 
        const response = await axios.get("http://localhost:5000/api/fiis"); 
        setFiis(response.data); 
        setFilteredFiis(response.data); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Erro ao buscar FIIs", error);
      }
    }; 
    fetchData(); 
  }, []); 

  const handleFilter = () => { 
    let result = fiis; 
    if (search) result = result.filter((fii) => fii.nome.toLowerCase().includes(search.toLowerCase())); 
    if (pvpMin) result = result.filter((fii) => fii.pvp >= parseFloat(pvpMin)); 
    if (pvpMax) result = result.filter((fii) => fii.pvp <= parseFloat(pvpMax)); 
    if (segmento) result = result.filter((fii) => fii.segmento === segmento); 
    setFilteredFiis(result); 
  };

  return ( 
    <RootContainer> 
      <Title>Filtrar FIIs da Bolsa</Title> 

      {/* Filtros */} 
      <FiltersContainer> 
        <FilterField 
          variant="outlined" 
          label="Nome do FII" 
          onChange={(e) => setSearch(e.target.value)} 
        /> 
        <FilterField 
          variant="outlined" 
          label="P/VP Min" 
          onChange={(e) => setPvpMin(e.target.value)} 
        /> 
        <FilterField 
          variant="outlined" 
          label="P/VP Max" 
          onChange={(e) => setPvpMax(e.target.value)} 
        /> 
        <Select 
          value={segmento} 
          displayEmpty 
          onChange={(e) => setSegmento(e.target.value)} 
          style={{ backgroundColor: "#333", color: "#fff", width: "12rem" }} 
        > 
          <MenuItem value=""><em style={{color: "#888" }}>Segmento</em> 
          </MenuItem> 
          <MenuItem value="Papel CRI">Papel CRI</MenuItem> 
          <MenuItem value="Logística">Logística</MenuItem> 
        </Select> 
        <StyledButton onClick={handleFilter}>Buscar</StyledButton> 
      </FiltersContainer> 

      {/* Tabela */} 
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <StyledTableContainer component={Paper}> 
          <Table> 
            <TableHead> 
              <TableRow> 
                <StyledTableCell>Nome</StyledTableCell> 
                <StyledTableCell>P/VP</StyledTableCell> 
                <StyledTableCell>Liquidez</StyledTableCell> 
                <StyledTableCell>Segmento</StyledTableCell> 
                <StyledTableCell>Cotação</StyledTableCell> 
              </TableRow> 
            </TableHead> 
            <TableBody> 
              {filteredFiis.length > 0 ? ( 
                filteredFiis.map((fii, index) => ( 
                  <StyledTableRow key={index}> 
                    <TableCell>{fii.nome}</TableCell> 
                    <TableCell>{fii.pvp}</TableCell> 
                    <TableCell>{fii.liquidez}</TableCell> 
                    <TableCell>{fii.segmento}</TableCell> 
                    <TableCell>{fii.cotacao}</TableCell> 
                  </StyledTableRow> 
                )) 
              ) : ( 
                <StyledTableRow> 
                  <TableCell colSpan={5} align="center"> 
                    Nenhum FII encontrado. 
                  </TableCell> 
                </StyledTableRow> 
              )} 
            </TableBody> 
          </Table> 
        </StyledTableContainer> 
      )} 
    </RootContainer> 
  ); 
}; 

export default CompanyFilter;