import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Biblioteca() {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/juegos')
      .then(response => response.json())
      .then(data => {
        setGames(data);
        setFilteredGames(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredGames(games);
    } else {
      const results = games.filter(game => game.nombreJuego.toLowerCase().includes(term.toLowerCase()));
      setFilteredGames(results);
    }
  };

  const handleGameClick = (idJuego) => {
    navigate(`/juego/${idJuego}`);
  };

  return (
    <div className="max-w-[1240px] mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-[#1BA098]">Biblioteca</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar juegos..."
        className="p-2 border border-gray-300 rounded-md w-full mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.idJuego} className="rounded-xl cursor-pointer" onClick={() => handleGameClick(game.idJuego)}>
              <div className="rounded-xl overflow-hidden group">
                <img src={`/${game.imagenJuego}`} alt={game.nombreJuego} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" />
              </div>
              <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
                {game.nombreJuego}
              </h2>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-[#DEB992]">No se encontraron juegos.</p>
        )}
      </div>
    </div>
  );
}

export default Biblioteca;
