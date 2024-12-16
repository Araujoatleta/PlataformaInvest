import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material'; 
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend); 

const Reports = () => { 
  const [fiisData, setFiisData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  // Função para buscar FIIs 
  const fetchFiis = async () => { 
    try { 
      const response = await axios.get('http://localhost:5000/api/fiis'); 
      setFiisData(response.data); 
      setLoading(false); 
    } catch (error) { 
      console.error('Erro ao buscar FIIs:', error.message); 
      setLoading(false); 
    } 
  };

  useEffect(() => { 
    fetchFiis(); 
  }, []); 

  // Gráfico de Cotação dos FIIs 
  const chartData = { 
    labels: fiisData.map(fii => fii.nome), 
    datasets: [ 
      { 
        label: 'Cotação', 
        data: fiisData.map(fii => fii.cotacao), 
        borderColor: 'rgba(75, 192, 192, 1)', 
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        fill: true, 
      }, 
    ], 
  };

  // Gráfico de Dividend Yield dos FIIs 
  const dyChartData = { 
    labels: fiisData.map(fii => fii.nome), 
    datasets: [ 
      { 
        label: 'Dividend Yield (%)', 
        data: fiisData.map(fii => fii.dividendYield), 
        borderColor: 'rgba(153, 102, 255, 1)', 
        backgroundColor: 'rgba(153, 102, 255, 0.2)', 
        fill: true, 
      }, 
    ], 
  };

  return ( 
    <Box sx={{ padding: 4, backgroundColor: '#141414', color: '#fff' }}> 
      <Typography variant="h4" sx={{ marginBottom: 3, color: '#E50914', textAlign: 'center' }}>
        Relatórios e Análises de FIIs
      </Typography>

      {/* Se os dados estão sendo carregados */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress sx={{ color: '#E50914' }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {/* Gráfico de Cotação */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, backgroundColor: '#1F1F1F', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#E50914' }}>Cotação dos FIIs</Typography>
                <Line data={chartData} options={{ responsive: true }} />
              </Paper>
            </Grid>

            {/* Gráfico de Dividend Yield */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, backgroundColor: '#1F1F1F', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#E50914' }}>Dividend Yield (%)</Typography>
                <Line data={dyChartData} options={{ responsive: true }} />
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            {/* Informações resumidas */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ backgroundColor: '#212121', boxShadow: 3, borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E50914' }}>Total de FIIs</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{fiisData.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ backgroundColor: '#212121', boxShadow: 3, borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E50914' }}>Média de Cotação</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    R$ {fiisData.reduce((sum, fii) => sum + fii.cotacao, 0) / fiisData.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ backgroundColor: '#212121', boxShadow: 3, borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E50914' }}>Média de Dividend Yield</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {(
                      fiisData.reduce((sum, fii) => sum + fii.dividendYield, 0) / fiisData.length
                    ).toFixed(2)} %
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ backgroundColor: '#212121', boxShadow: 3, borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E50914' }}>Liquidez Média</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {fiisData.reduce((sum, fii) => sum + fii.liquidez, 0) / fiisData.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box> 
  ); 
}; 

export default Reports;