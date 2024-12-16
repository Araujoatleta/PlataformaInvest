import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/system';

// Estilo personalizado para o contêiner principal
const Container = styled(Box)({
  padding: '20px',
  minHeight: '100vh',
  backgroundColor: '#141414',
  color: '#fff',
});

// Estilo para os cards de favoritos
const StyledCard = styled(Card)({
  backgroundColor: '#1F1F1F',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.02)',
    transition: 'transform 0.3s ease-in-out',
  },
});

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  // Função para buscar os FIIs favoritos
  const fetchFavoritos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fiis/favoritos');
      setFavoritos(response.data);
    } catch (error) {
      console.error('Erro ao buscar FIIs favoritos:', error.message);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <Container>
      {/* Título da página */}
      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#E50914', marginBottom: '20px', fontWeight: 'bold' }}
      >
        Meus FIIs Favoritos
      </Typography>

      {/* Grid com os FIIs favoritos */}
      <Grid container spacing={3}>
        {favoritos.length > 0 ? (
          favoritos.map((fii) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={fii.id}>
              <StyledCard>
                <CardContent>
                  {/* Nome do FII */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {fii.nome}
                  </Typography>

                  {/* Informações do FII */}
                  <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                    Cotação: <strong>R$ {fii.cotacao}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                    Dividend Yield: <strong>{fii.dividendYield}%</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                    Market Cap: <strong>R$ {fii.marketCap}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Liquidez: <strong>{fii.liquidez}</strong>
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  {/* Ícone de Favorito */}
                  <IconButton color="secondary" disabled>
                    <StarIcon sx={{ color: '#FFD700' }} />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: '100%', marginTop: '20px' }}>
            Nenhum FII favoritado encontrado.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Favoritos;