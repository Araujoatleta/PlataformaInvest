// fiiRoutes.js

const express = require('express');
const router = express.Router();

router.delete('/delete/:nome', async (req, res) => {
  try {
    const { nome } = req.params;
    const fii = await Fii.findOneAndDelete({ nome });

    if (!fii) {
      return res.status(404).json({ error: 'FII não encontrado' });
    }

    res.status(200).json({ message: 'FII deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar FII:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;