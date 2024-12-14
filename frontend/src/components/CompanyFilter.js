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
  Typography,
  Box,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CompanyFilter = () => {
  const [fiis, setFiis] = useState([]); // Lista de FIIs
  const [search, setSearch] = useState(""); // Barra de pesquisa
  const [error, setError] = useState(""); // Armazena erro da API

  // Dados mockados como fallback
  const mockFiis = [
    { nome: "MXRF11", pvp: 0.95, liquidez: 15000, qtd_imoveis: 12, vacancia_media: 3.2, cotacao: 10.5 },
    { nome: "HGLG11", pvp: 1.05, liquidez: 12000, qtd_imoveis: 20, vacancia_media: 1.8, cotacao: 150.0 },
  ];

  // Busca os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fiis");
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Formato inválido da API.");
        }
        setFiis(response.data);
        setError("");
      } catch (err) {
        console.error("Erro na API:", err.message);
        setError("Dados inválidos retornados da API. Usando dados padrões.");
        setFiis(mockFiis); // Dados mockados
      }
    };
    fetchData();
  }, []);

  // Filtra FIIs
  const filteredFiis = fiis.filter((fii) =>
    fii.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Filtro de FIIs
      </Typography>

      {/* Mostra erro, se houver */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Barra de pesquisa */}
      <TextField
        label="Pesquisar FIIs..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabela */}
      <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nome</b></TableCell>
              <TableCell><b>P/VP</b></TableCell>
              <TableCell><b>Liquidez</b></TableCell>
              <TableCell><b>Qtd de Imóveis</b></TableCell>
              <TableCell><b>Vacância Média</b></TableCell>
              <TableCell><b>Cotação</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiis.length > 0 ? (
              filteredFiis.map((fii, index) => (
                <TableRow key={index}>
                  <TableCell>{fii.nome}</TableCell>
                  <TableCell>{fii.pvp}</TableCell>
                  <TableCell>{fii.liquidez}</TableCell>
                  <TableCell>{fii.qtd_imoveis}</TableCell>
                  <TableCell>{fii.vacancia_media}%</TableCell>
                  <TableCell>R$ {fii.cotacao.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum FII encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Gráfico */}
      <Box sx={{ marginTop: "2rem", height: 300 }}>
        <Typography variant="h5" gutterBottom>
          Gráfico de Liquidez
        </Typography>
        <ResponsiveContainer>
          <BarChart data={filteredFiis}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="liquidez" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CompanyFilter;