import React, { useState, useEffect } from 'react';
import AddFii from './AddFii'; // Importa o componente de adicionar FII

const ParentComponent = () => {
  const [fiis, setFiis] = useState([]);

  // Função para carregar os FIIs da API
  const loadFiis = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/fiis');
      const data = await response.json();
      setFiis(data); // Atualiza o estado com a lista de FIIs
    } catch (error) {
      console.error("Erro ao carregar FIIs:", error);
    }
  };

  // Função para deletar um FII pelo nome
  const deleteFii = async (nome) => {
    try {
      const response = await fetch(`http://localhost:5000/api/fiis/delete/${nome}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Atualiza a lista de FIIs após a exclusão
        setFiis(fiis.filter(fii => fii.nome !== nome));
        alert('FII deletado com sucesso!');
      } else {
        alert('Erro ao deletar o FII.');
      }
    } catch (error) {
      console.error('Erro ao deletar FII:', error);
      alert('Erro ao deletar o FII');
    }
  };

  // Função que será chamada após adicionar um FII
  const handleFiiAdded = () => {
    loadFiis(); // Recarrega a lista de FIIs após a adição
  };

  // Carrega os FIIs assim que o componente for montado
  useEffect(() => {
    loadFiis();
  }, []);

  return (
    <div>
      <h2>Lista de FIIs</h2>
      {/* Passa a função handleFiiAdded para o AddFii */}
      <AddFii onFiiAdded={handleFiiAdded} />
      
      {/* Exibe a lista de FIIs */}
      <ul>
        {fiis.map(fii => (
          <li key={fii.nome}>
            {fii.nome} - <button onClick={() => deleteFii(fii.nome)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;