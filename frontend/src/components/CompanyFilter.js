import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, Box, Typography } from '@mui/material';

// Componente de filtro de FIIs com sistema de favoritos
const CompanyFilter = () => {
  const [fiis, setFiis] = useState([]);
  const [filters, setFilters] = useState({ nome: '', minDY: '', maxPVP: '' });

  // Função para buscar FIIs
  const fetchFiis = async () => {
    const response = await axios.get('http://localhost:5000/api/fiis', { params: filters });
    setFiis(response.data);
  };

  // Função para marcar/desmarcar favoritos
  const handleFavoriteToggle = async (id, favorito) => {
    try {
      await axios.post('http://localhost:5000/api/fiis/favorito', {
        id: id,
        favorito: !favorito,
      });
      // Atualiza o estado para refletir a mudança
      setFiis(fiis.map(fii => fii.id === id ? { ...fii, favorito: !favorito } : fii));
    } catch (error) {
      console.error('Erro ao atualizar favorito', error);
    }
  };

  useEffect(() => {
    fetchFiis();
  }, [filters]);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#141414', color: '#fff' }}>
      <Typography variant="h4" sx={{ color: '#E50914', marginBottom: 2 }}>
        Filtros de FIIs
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Nome do FII"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
        />
        <TextField
          label="DY Mínimo (%)"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilters({ ...filters, minDY: e.target.value })}
        />
        <TextField
          label="P/VP Máximo"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilters({ ...filters, maxPVP: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={fetchFiis}>
          Buscar
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Cotação</TableCell>
              <TableCell>DY (%)</TableCell>
              <TableCell>P/VP</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Liquidez</TableCell>
              <TableCell>Favorito</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fiis.map((fii) => (
              <TableRow key={fii.id}>
                <TableCell>{fii.nome}</TableCell>
                <TableCell>R$ {fii.cotacao}</TableCell>
                <TableCell>{fii.dividendYield}%</TableCell>
                <TableCell>{fii.pvp}</TableCell>
                <TableCell>R$ {fii.marketCap}</TableCell>
                <TableCell>{fii.liquidez}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleFavoriteToggle(fii.id, fii.favorito)}
                    color={fii.favorito ? 'secondary' : 'primary'}
                  >
                    {fii.favorito ? '★ Favorito' : '☆ Marcar como Favorito'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyFilter;