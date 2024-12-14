import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, AppBar, Toolbar, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [fiis, setFiis] = useState([]);
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
      const response = await fetch('http://localhost:5000/api/fiis');
      const data = await response.json();
      setFiis(data);
      calcularEstatisticas(data);
    } catch (error) {
      toast.error('Erro ao carregar FIIs');
    }
  };

  const calcularEstatisticas = (fiisData) => {
    const total = fiisData.length;

    const mediaCotacao =
      fiisData.reduce((sum, fii) => sum + (parseFloat(fii.cotacao) || 0), 0) / total || 0;

    const mediaVacancia =
      fiisData.reduce((sum, fii) => sum + (parseFloat(fii.vacancia_media) || 0), 0) / total || 0;

    setStats({
      totalFiis: total,
      mediaCotacao: mediaCotacao.toFixed(2),
      mediaVacancia: mediaVacancia.toFixed(2),
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1A1A2E',
        color: '#EDEDED',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Barra Superior */}
      <AppBar position="static" style={{ background: '#0D47A1' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard de FIIs
          </Typography>
        </Toolbar>
      </AppBar>

      <ToastContainer />

      {/* Conteúdo Principal */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {/* Estatísticas */}
        <Grid container spacing={3}>
          {[
            { label: 'Total de FIIs', value: stats.totalFiis },
            { label: 'Média de Cotação', value: `R$ ${stats.mediaCotacao} `},
            { label: 'Média de Vacância', value:` ${stats.mediaVacancia}% `},
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  transform: 'scale(1)',
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Card
                  sx={{
                    boxShadow: 3,
                    textAlign: 'center',
                    backgroundColor: '#16213E',
                    color: '#EDEDED',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.label}
                    </Typography>
                    <Typography variant="h3" style={{ color: '#1EA1FF' }}>
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Gráfico */}
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                opacity: 1,
                transition: 'opacity 1s ease',
              }}
            >
              <Card
                sx={{
                  padding: 2,
                  boxShadow: 3,
                  backgroundColor: '#16213E',
                  color: '#FFFFFF',
                }}
              >
                <Typography variant="h6" gutterBottom style={{ color: '#EDEDED' }}>
                  Liquidez dos FIIs
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fiis}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="nome" tick={{ fill: '#EDEDED' }} /><YAxis tick={{ fill: '#EDEDED' }} />
                    <Tooltip contentStyle={{ background: '#16213E', color: '#FFFFFF' }} />
                    <Bar dataKey="liquidez" fill="#1EA1FF" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;