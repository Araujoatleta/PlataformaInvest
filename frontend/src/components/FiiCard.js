import React, { useState } from 'react';
import axios from 'axios';

const FiiCard = ({ fii }) => {
  const [isFavorite, setIsFavorite] = useState(fii.favorito);

  const handleFavoriteToggle = async () => {
    try {
      await axios.post('/api/fiis/favorito', {
        id: fii.id,
        favorito: !isFavorite
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao atualizar o favorito:', error);
    }
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
      <h3>{fii.nome}</h3>
      <p>Cotação: R$ {fii.cotacao}</p>
      <p>DY: {fii.dividendYield}%</p>
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? '🌟 Favorito' : '⭐ Marcar como Favorito'}
      </button>
    </div>
  );
};

export default FiiCard;