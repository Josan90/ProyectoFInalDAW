import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Juego() {
  const { idJuego } = useParams();
  const { user } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [estado, setEstado] = useState('Comenzado');
  const [estadisticas, setEstadisticas] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [valoracion, setValoracion] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/juegos/${idJuego}`)
      .then(response => response.json())
      .then(data => {
        setGame(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    axios.get(`http://localhost:3001/api/completacion/estadisticas/${idJuego}`)
      .then(response => {
        setEstadisticas(response.data);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
        setEstadisticas(null);
      });

    axios.get(`http://localhost:3001/api/comentarios/juego/${idJuego}`)
      .then(response => {
        setComentarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [idJuego]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Debes iniciar sesión para agregar tiempos.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/completacion', {
        fechaInicioCompletacion: inicio,
        fechaFinCompletacion: fin,
        totalCompletacion: tiempo,
        estadoCompletacion: estado,
        idUsuarioFK: user.idUsuario,
        idJuegoFK: idJuego
      });
      alert('Tiempo agregado correctamente');
      navigate('/biblioteca');
    } catch (error) {
      console.error('Error al agregar el tiempo:', error);
      alert('Hubo un error al agregar el tiempo.');
    }
  };

  const handleComentarioSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Debes iniciar sesión para agregar un comentario.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/comentarios', {
        idUsuarioFK: user.idUsuario,
        idJuegoFK: idJuego,
        textoComentario: nuevoComentario,
        valoracionComentario: valoracion,
      });
      setComentarios([...comentarios, { nombreUsuario: user.nombreUsuario, textoComentario: nuevoComentario, valoracionComentario: valoracion, fechaComentario: new Date() }]);
      setNuevoComentario('');
      setValoracion(1);
    } catch (error) {
      console.error('Error al agregar el comentario:', error);
    }
  };

  const formatDuration = (duration) => {
    return parseFloat(duration).toFixed(2);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando juego...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error al cargar el juego: {error.message}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {game && (
        <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/3 p-4">
            <img
              src={`/${game.imagenJuego}`}
              alt={game.nombreJuego}
              className="w-full h-auto object-cover object-center rounded-lg"
            />
            <div className="border-2 border-[#DEB992] p-4 mt-4 rounded-lg">
              <h2 className="text-xl text-white font-semibold">Información del Juego</h2>
              <p className="text-[#1BA098] text-lg"><b>Género:</b> {game.generoJuego}</p>
              <p className="text-[#1BA098] text-lg"><b>Desarrollador:</b> {game.desarrolladorJuego}</p>
              <p className="text-[#1BA098] text-lg"><b>Fecha de Lanzamiento:</b> {game.fechaJuego}</p>
            </div>
          </div>
          <div className="md:w-2/3 p-4">
            <h1 className="text-4xl font-bold text-[#DEB992] mb-4">{game.nombreJuego}</h1>
            <p className="text-gray-200 text-lg mb-4">{game.descripcionJuego}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-[#DEB992] p-4 rounded-lg h-full">
                <h2 className="text-2xl font-bold text-gray-300">Tiempos del Juego</h2>
                {estadisticas ? (
                  estadisticas.duracionMedia || estadisticas.usuariosComenzados || estadisticas.usuariosCompletados || estadisticas.usuariosRejugados || estadisticas.usuariosAbandonados ? (
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="text-[#1BA098]"><b>Duración media:</b></p>
                        <p className="text-gray-300 text-xl">{estadisticas.duracionMedia ? formatDuration(estadisticas.duracionMedia) + ' horas' : 'No disponible'}</p>
                      </div>
                      <div>
                        <p className="text-[#1BA098]"><b>Usuarios comenzados:</b></p>
                        <p className="text-gray-300 text-xl">{estadisticas.usuariosComenzados}</p>
                      </div>
                      <div>
                        <p className="text-[#1BA098]"><b>Usuarios completados:</b></p>
                        <p className="text-gray-300 text-xl">{estadisticas.usuariosCompletados}</p>
                      </div>
                      <div>
                        <p className="text-[#1BA098]"><b>Usuarios rejugando:</b></p>
                        <p className="text-gray-300 text-xl">{estadisticas.usuariosRejugados}</p>
                      </div>
                      <div>
                        <p className="text-[#1BA098]"><b>Usuarios abandonados:</b></p>
                        <p className="text-gray-300 text-xl">{estadisticas.usuariosAbandonados}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 mt-4">Aún no hay datos</p>
                  )
                ) : (
                  <p className="text-gray-500 mt-4">Cargando estadísticas...</p>
                )}
              </div>
              <div className="border-2 border-[#DEB992] p-4 rounded-lg h-full">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">Agregar Tiempos</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-[#1BA098]">Fecha de Inicio</label>
                    <input type="date" className="w-full p-2 border border-gray-300 rounded-md" value={inicio} onChange={(e) => setInicio(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#1BA098]">Fecha de Fin</label>
                    <input type="date" className="w-full p-2 border border-gray-300 rounded-md" value={fin} onChange={(e) => setFin(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#1BA098]">Tiempo Total (Horas)</label>
                    <input type="number" className="w-full p-2 border border-gray-300 rounded-md" value={tiempo} onChange={(e) => setTiempo(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#1BA098]">Estado del Juego</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md" value={estado} onChange={(e) => setEstado(e.target.value)}>
                      <option>Comenzado</option>
                      <option>Abandonado</option>
                      <option>Rejugar</option>
                      <option>Completado</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full p-2 bg-[#1BA098] text-white hover:bg-[#DEB992] rounded-full mt-4">Agregar</button>
                </form>
              </div>
            </div>
            <div className="border-2 border-[#DEB992] p-4 rounded-lg mt-4">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">Comentarios y Valoraciones</h2>
              {comentarios.length > 0 ? (
                <div className="space-y-4">
                  {comentarios.map((comentario, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg">
                      <p className="text-[#1BA098]"><b>{comentario.nombreUsuario}</b> ({comentario.valoracionComentario}/5)</p>
                      <p className="text-gray-300">{comentario.textoComentario}</p>
                      <p className="text-gray-400 text-sm">{new Date(comentario.fechaComentario).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay comentarios aún.</p>
              )}
              {user && (
                <form onSubmit={handleComentarioSubmit} className="mt-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    rows="3"
                    placeholder="Escribe tu comentario..."
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    required
                  />
                  <div className="mb-4">
                    <label className="block text-[#1BA098]">Valoración</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md" value={valoracion} onChange={(e) => setValoracion(e.target.value)}>
                      {[1, 2, 3, 4, 5].map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full p-2 bg-[#1BA098] text-white hover:bg-[#DEB992] rounded-full mt-2">Agregar Comentario</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Juego;
