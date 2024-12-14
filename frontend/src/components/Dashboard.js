import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, AppBar, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dashboard Principal
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

  // Buscar FIIs do servidor
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

  // Calcular estatísticas
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
    <>
      {/* Barra Superior */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard de FIIs
          </Typography>
        </Toolbar>
      </AppBar>

      <ToastContainer />

      {/* Estatísticas */}
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ boxShadow: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total de FIIs
                </Typography>
                <Typography variant="h3">{stats.totalFiis}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ boxShadow: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Média de Cotação
                </Typography>
                <Typography variant="h3">R$ {stats.mediaCotacao}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ boxShadow: 3, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Média de Vacância
                </Typography>
                <Typography variant="h3">{stats.mediaVacancia}%</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Card sx={{ padding: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                Liquidez dos FIIs
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fiis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="liquidez" fill="#8884d8" />
                </BarChart></ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;