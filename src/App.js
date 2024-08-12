import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cats, setCats] = useState([]);
  const [singleCat, setSingleCat] = useState(null);
  const [catId, setCatId] = useState('');
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const url = 'https://api.thecatapi.com/v1/images/search?limit=10';
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Erro na requisição da API');
        }

        const data = await response.json();
        setCats(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCats();
  }, []);

  const handleFetchCatById = async () => {
    if (catId.trim() === '') {
      setError('O campo ID não pode estar vazio');
      return;
    }

    try {
      const url = `https://api.thecatapi.com/v1/images/${catId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }

      const data = await response.json();
      setSingleCat(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSingleCat(null);
    }
  };

  const handleLike = (catId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [catId]: (prevLikes[catId] || 0) + 1,
    }));
  };

  return (
    <div className="container">
      
      
      <header className="promocao-header">
        <strong className="promocao-header-title">Galeria de Gatos</strong>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="row">
        {cats.map((cat) => (
          <article key={cat.id} className="cat-item">
            <img src={cat.url} alt="Gato" />
            <p>ID: {cat.id}</p>
            <button className="like-button" onClick={() => handleLike(cat.id)}>
              Curtir
            </button>
            <p>Curtidas: {likes[cat.id] || 0}</p>
          </article>
        ))}
      </div>

      <div className="search-by-id">
        <h2>Buscar Gato por ID</h2>
        <input
          type="text"
          placeholder="Digite o ID do gato"
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
        />
        <button onClick={handleFetchCatById}>Buscar</button>
      </div>

      {singleCat && (
        <div className="single-cat">
          <h2>Gato Encontrado:</h2>
          <img src={singleCat.url} alt="Gato" />
        </div>
      )}
    </div>
  );
}

export default App;
