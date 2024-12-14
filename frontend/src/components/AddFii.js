import React, { useState, useEffect } from 'react'; 
import { TextField, Button, Grid, Card, CardContent, Typography, AppBar, Toolbar, Box } from '@mui/material'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AddFii = () => { 
  const [nome, setNome] = useState(''); 
  const [pvp, setPvp] = useState(''); 
  const [liquidez, setLiquidez] = useState(''); 
  const [qtdImoveis, setQtdImoveis] = useState(''); 
  const [vacanciaMedia, setVacanciaMedia] = useState(''); 
  const [cotacao, setCotacao] = useState(''); 
  const [fiis, setFiis] = useState([]); 

  // Buscar FIIs no servidor 
  useEffect(() => { 
    fetchFiis(); 
  }, []); 

  const fetchFiis = async () => { 
    const response = await fetch('http://localhost:5000/api/fiis'); 
    const data = await response.json(); 
    setFiis(data); 
  }; 

  const addFii = async () => { 
    const response = await fetch('http://localhost:5000/api/fiis/add', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ nome, pvp, liquidez, qtd_imoveis: qtdImoveis, vacancia_media: vacanciaMedia, cotacao }), 
    }); 
    if (response.ok) { 
      toast.success('FII adicionado com sucesso!'); 
      fetchFiis(); 
    } else { 
      toast.error('Erro ao adicionar FII.'); 
    } 
  }; 

  const deleteFii = async (id) => { 
    const response = await fetch(`http://localhost:5000/api/fiis/delete/${id}`, { method: 'DELETE' }); 
    if (response.ok) { 
      toast.success('FII deletado com sucesso!'); 
      fetchFiis(); 
    } else { 
      toast.error('Erro ao deletar FII.'); 
    } 
  }; 

  return ( 
    <> 
      {/* Barra superior */} 
      <AppBar position="static" color="primary"> 
        <Toolbar> 
          <Typography variant="h6" sx={{ flexGrow: 1 }}> 
            Gerenciamento de FIIs 
          </Typography> 
        </Toolbar> 
      </AppBar> 

      <ToastContainer /> 

      {/* Formulário de Adicionar FII */} 
      <Grid container spacing={2} style={{ padding: 20 }}> 
        <Grid item xs={12} md={6}> 
          <Card sx={{ padding: 3, boxShadow: 3 }}> 
            <Typography variant="h5" gutterBottom> 
              Adicionar Novo FII 
            </Typography> 
            <TextField label="Nome" fullWidth margin="normal" value={nome} onChange={(e) => setNome(e.target.value)} /> 
            <TextField label="P/VP" fullWidth margin="normal" value={pvp} onChange={(e) => setPvp(e.target.value)} /> 
            <TextField 
              label="Liquidez" 
              fullWidth 
              margin="normal" 
              value={liquidez} 
              onChange={(e) => setLiquidez(e.target.value)} 
            /> 
            <TextField 
              label="Qtd de Imóveis" 
              fullWidth 
              margin="normal" 
              value={qtdImoveis} 
              onChange={(e) => setQtdImoveis(e.target.value)} 
            /> 
            <TextField 
              label="Vacância Média" 
              fullWidth 
              margin="normal" 
              value={vacanciaMedia} 
              onChange={(e) => setVacanciaMedia(e.target.value)} 
            /> 
            <TextField 
              label="Cotação" 
              fullWidth 
              margin="normal" 
              value={cotacao} 
              onChange={(e) => setCotacao(e.target.value)} 
            /> 
            <Button 
              variant="contained" 
              color="primary" 
              style={{ marginTop: 10, borderRadius: '20px' }} 
              onClick={addFii} 
            > 
              Adicionar FII 
            </Button> 
          </Card> 
        </Grid> 

        {/* Lista de FIIs */} 
        <Grid item xs={12} md={6}> 
          <Typography variant="h5" gutterBottom> 
            Lista de FIIs 
          </Typography> 
          {fiis.map((fii) => ( 
            <Box 
              key={fii.id} 
              sx={{ 
                opacity: 1, 
                transition: 'opacity 0.5s ease', 
                marginBottom: 2,boxShadow: 3, 
              }}
            > 
              <Card> 
                <CardContent> 
                  <Typography variant="h6">{fii.nome}</Typography> 
                  <Typography>P/VP: {fii.pvp}</Typography> 
                  <Typography>Liquidez: {fii.liquidez}</Typography> 
                  <Typography>Qtd de Imóveis: {fii.qtd_imoveis}</Typography> 
                  <Typography>Vacância Média: {fii.vacancia_media}</Typography> 
                  <Typography>Cotação: {fii.cotacao}</Typography> 
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => deleteFii(fii.id)} 
                    style={{ marginTop: 10 }} 
                  > 
                    Deletar 
                  </Button> 
                </CardContent> 
              </Card> 
            </Box> 
          ))} 
        </Grid> 
      </Grid> 
    </> 
  ); 
}; 
 
export default AddFii;