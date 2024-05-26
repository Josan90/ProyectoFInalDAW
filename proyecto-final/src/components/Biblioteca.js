import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Biblioteca = () => {
  const [juegos, setJuegos] = useState([]);
  const [selectedJuego, setSelectedJuego] = useState(null);
  const [formData, setFormData] = useState({
    fechaInicioCompletacion: '',
    fechaFinCompletacion: '',
    totalCompletacion: '',
    tiempo_completado: '',
    estado_completacion: '',
  });

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await axios.get('/api/juegos');
        setJuegos(response.data);
      } catch (error) {
        console.error('Error fetching juegos', error);
      }
    };

    fetchJuegos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/completacion', {
        ...formData,
        idUsuarioFK: 1, // Aquí debes agregar la lógica para obtener el ID del usuario autenticado
        idJuegoFK: selectedJuego,
      });
      // Manejar el éxito de la solicitud
    } catch (error) {
      console.error('Error adding completacion', error);
      // Manejar el error de la solicitud
    }
  };

  return (
    <div>
      <h2>Biblioteca de Juegos</h2>
      <select onChange={(e) => setSelectedJuego(e.target.value)} value={selectedJuego}>
        <option value="">Selecciona un juego</option>
        {juegos.map((juego) => (
          <option key={juego.idJuego} value={juego.idJuego}>{juego.nombreJuego}</option>
        ))}
      </select>
      {selectedJuego && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Fecha de Inicio</label>
            <input type="date" name="fechaInicioCompletacion" value={formData.fechaInicioCompletacion} onChange={handleChange} />
          </div>
          <div>
            <label>Fecha de Fin</label>
            <input type="date" name="fechaFinCompletacion" value={formData.fechaFinCompletacion} onChange={handleChange} />
          </div>
          <div>
            <label>Total de Horas</label>
            <input type="number" step="0.01" name="totalCompletacion" value={formData.totalCompletacion} onChange={handleChange} />
          </div>
          <div>
            <label>Tiempo Completado</label>
            <input type="number" step="0.01" name="tiempo_completado" value={formData.tiempo_completado} onChange={handleChange} />
          </div>
          <div>
            <label>Estado de Completación</label>
            <input type="text" name="estado_completacion" value={formData.estado_completacion} onChange={handleChange} />
          </div>
          <button type="submit">Añadir</button>
        </form>
      )}
    </div>
  );
};

export default Biblioteca;
