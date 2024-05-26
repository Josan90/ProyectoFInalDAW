import React, { useState, useEffect } from 'react';

function Guias() {
  const [searchTerm, setSearchTerm] = useState('');
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [alphabetFilter, setAlphabetFilter] = useState('');

  useEffect(() => {
    fetch('/public/games.json')
      .then(response => response.json())
      .then(data => {
        setGuides(data);
        setFilteredGuides(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setAlphabetFilter('');

    if (term.trim() === '') {
      setFilteredGuides(guides);
    } else {
      const results = guides.filter(guide => guide.name.toLowerCase().includes(term.toLowerCase()));
      setFilteredGuides(results);
    }
  };

  const handleAlphabetFilter = (letter) => {
    setAlphabetFilter(letter);
    setSearchTerm('');

    if (letter === '') {
      setFilteredGuides(guides);
    } else {
      const results = guides.filter(guide => guide.name.toLowerCase().startsWith(letter.toLowerCase()));
      setFilteredGuides(results);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setAlphabetFilter('');
    setFilteredGuides(guides);
  };

  return (
    <div className="max-w-[1240px] mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-[#1BA098]">Guías</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar guías..."
        className="p-2 border border-gray-300 rounded-md w-full mb-4"
      />
      <div className="flex justify-center space-x-2 mb-4">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <button
            key={letter}
            className={`p-2 ${alphabetFilter === letter ? 'bg-[#DEB992] text-white' : 'bg-gray-300 text-gray-800'} rounded`}
            onClick={() => handleAlphabetFilter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <button
        className="p-2 bg-red-500 text-white rounded mb-4"
        onClick={handleReset}
      >
        Reset
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide, index) => (
            <div key={index} className="rounded-xl overflow-hidden group">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
                {guide.name}
              </h2>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-[#DEB992]">No se encontraron guías.</p>
        )}
      </div>
    </div>
  );
}

export default Guias;
