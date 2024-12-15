import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";

// Estilização Netflix
const BackgroundContainer = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #141414, #0D0D0D)", // Fundo degradê Netflix
  padding: "2rem",
  color: "#FFFFFF",
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#141414",
  boxShadow: "none",
});

const StyledCard = styled(Card)({
  backgroundColor: "#1F1F1F",
  color: "#FFFFFF",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.7)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1.5rem",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#E50914",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E50914",
    },
    borderRadius: "8px",
    backgroundColor: "#333",
  },
  "& .MuiInputLabel-root": {
    color: "#AAA",
    "&.Mui-focused": {
      color: "#E50914",
    },
  },
  input: {
    color: "#FFFFFF",
    fontSize: "1.1rem",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#E50914",
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: "0.8rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#B20710",
    transform: "scale(1.05)",
    transition: "transform 0.3s ease",
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: "#B20710",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#8C060F",
    transform: "scale(1.05)",
  },
});

const Title = styled(Typography)({
  color: "#E50914",
  fontWeight: "bold",
  fontSize: "2rem",
  marginBottom: "1rem",
});

const AddFii = () => {
  const [nome, setNome] = useState("");
  const [pvp, setPvp] = useState("");
  const [liquidez, setLiquidez] = useState("");
  const [qtdImoveis, setQtdImoveis] = useState("");
  const [vacanciaMedia, setVacanciaMedia] = useState("");
  const [cotacao, setCotacao] = useState("");
  const [fiis, setFiis] = useState([]);

  useEffect(() => {
    fetchFiis();
  }, []);

  const fetchFiis = async () => {
    const response = await fetch("http://localhost:5000/api/fiis");
    const data = await response.json();
    setFiis(data);
  };

  const addFii = async () => {
    const response = await fetch("http://localhost:5000/api/fiis/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        pvp,
        liquidez,
        qtd_imoveis: qtdImoveis,
        vacancia_media: vacanciaMedia,
        cotacao,
      }),
    });
    if (response.ok) {
      toast.success("FII adicionado com sucesso!");
      fetchFiis();
    } else {
      toast.error("Erro ao adicionar FII.");
    }
  };

  const deleteFii = async (id) => {
    const response = await fetch(
     ` http://localhost:5000/api/fiis/delete/${id}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      toast.success("FII deletado com sucesso!");
      fetchFiis();
    } else {
      toast.error("Erro ao deletar FII.");
    }
  };

  return (
    <BackgroundContainer>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gerenciamento de FIIs
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <ToastContainer />

      <Grid container spacing={4} mt={2}>
        {/* Formulário de Adicionar FII */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Title>Adicionar Novo FII</Title>
            <StyledTextField
              label="Nome"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <StyledTextField
            label="P/VP"
              fullWidth
              value={pvp}
              onChange={(e) => setPvp(e.target.value)}
            />
            <StyledTextField
              label="Liquidez"
              fullWidth
              value={liquidez}
              onChange={(e) => setLiquidez(e.target.value)}
            />
            <StyledTextField
              label="Qtd de Imóveis"
              fullWidth
              value={qtdImoveis}
              onChange={(e) => setQtdImoveis(e.target.value)}
            />
            <StyledTextField
              label="Vacância Média"
              fullWidth
              value={vacanciaMedia}
              onChange={(e) => setVacanciaMedia(e.target.value)}
            />
            <StyledTextField
              label="Cotação"
              fullWidth
              value={cotacao}
              onChange={(e) => setCotacao(e.target.value)}
            />
            <StyledButton fullWidth onClick={addFii}>
              Adicionar FII
            </StyledButton>
          </StyledCard>
        </Grid>

        {/* Tabela de FIIs */}
        <Grid item xs={12} md={6}>
          <Title>Lista de FIIs</Title>
          <TableContainer component={Paper} sx={{ backgroundColor: "#1F1F1F" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#E50914" }}>Nome</TableCell>
                  <TableCell style={{ color: "#E50914" }}>P/VP</TableCell>
                  <TableCell style={{ color: "#E50914" }}>Liquidez</TableCell>
                  <TableCell style={{ color: "#E50914" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fiis.map((fii) => (
                  <TableRow key={fii.id}>
                    <TableCell style={{ color: "#FFFFFF" }}>{fii.nome}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{fii.pvp}</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>{fii.liquidez}</TableCell>
                    <TableCell>
                      <DeleteButton
                        size="small"
                        onClick={() => deleteFii(fii.id)}
                      >
                        Deletar
                      </DeleteButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </BackgroundContainer>
  );
};

export default AddFii;