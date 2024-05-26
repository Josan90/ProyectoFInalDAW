import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Juego() {
  const { idJuego } = useParams();
  const { user } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tiempoTotal, setTiempoTotal] = useState('');
  const [estado, setEstado] = useState('Completado');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/juegos/${idJuego}`)
      .then(response => {
        setGame(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error al cargar el juego');
        setLoading(false);
      });
  }, [idJuego]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para añadir un juego completado');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/completacion', {
        fechaInicioCompletacion: fechaInicio,
        fechaFinCompletacion: fechaFin,
        totalCompletacion: tiempoTotal,
        estadoCompletacion: estado,
        idUsuarioFK: user.idUsuario,
        idJuegoFK: idJuego
      });
      alert('Juego completado añadido exitosamente');
    } catch (error) {
      setError('Error al añadir el juego completado');
      console.error('Error al añadir el juego completado', error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando juego...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {game && (
        <div className="bg-white border border-[#DEB992] rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={`/${game.imagenJuego}`}
              alt={game.nombreJuego}
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">{game.nombreJuego}</h1>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-base mb-4">{game.descripcionJuego}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Género: {game.generoJuego}</span>
              <span className="text-gray-500">Desarrollador: {game.desarrolladorJuego}</span>
              <span className="text-gray-500">Fecha de Lanzamiento: {game.fechaJuego}</span>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 border-t border-[#DEB992] pt-4">
              <div className="mb-4">
                <label htmlFor="fechaInicio" className="block text-sm font-medium text-[#051622]">Fecha de Inicio</label>
                <input
                  type="date"
                  id="fechaInicio"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fechaFin" className="block text-sm font-medium text-[#051622]">Fecha de Fin</label>
                <input
                  type="date"
                  id="fechaFin"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tiempoTotal" className="block text-sm font-medium text-[#051622]">Tiempo Total (horas)</label>
                <input
                  type="number"
                  id="tiempoTotal"
                  value={tiempoTotal}
                  onChange={(e) => setTiempoTotal(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="estado" className="block text-sm font-medium text-[#051622]">Estado</label>
                <select
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="Completado">Completado</option>
                  <option value="Abandonado">Abandonado</option>
                  <option value="Rejugando">Rejugando</option>
                  <option value="Pausado">Pausado</option>
                </select>
              </div>
              <button type="submit" className="bg-[#051622] text-white rounded-md py-2 w-full hover:bg-[#DEB992] hover:text-[#1BA098] transition-colors duration-300">Añadir Completación</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Juego;
