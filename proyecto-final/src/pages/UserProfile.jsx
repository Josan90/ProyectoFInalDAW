import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [estadisticas, setEstadisticas] = useState(null);
  const [ultimosJuegos, setUltimosJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/api/users/estadisticas/${user.idUsuario}`)
        .then(response => {
          setEstadisticas(response.data.estadisticas);
          setUltimosJuegos(response.data.ultimosJuegos);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error al cargar el perfil: {error.message}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {user && (
        <div>
          <h1 className="text-4xl font-bold text-[#DEB992] mb-4">{user.nombreUsuario}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="border-2 border-[#DEB992] p-4 rounded-lg text-center">
              <h2 className="text-xl font-bold text-gray-300">Completados</h2>
              <p className="text-[#1BA098] text-2xl">{estadisticas ? estadisticas.completados : 0}</p>
            </div>
            <div className="border-2 border-[#DEB992] p-4 rounded-lg text-center">
              <h2 className="text-xl font-bold text-gray-300">Rejugados</h2>
              <p className="text-[#1BA098] text-2xl">{estadisticas ? estadisticas.rejugados : 0}</p>
            </div>
            <div className="border-2 border-[#DEB992] p-4 rounded-lg text-center">
              <h2 className="text-xl font-bold text-gray-300">Comenzados</h2>
              <p className="text-[#1BA098] text-2xl">{estadisticas ? estadisticas.comenzados : 0}</p>
            </div>
            <div className="border-2 border-[#DEB992] p-4 rounded-lg text-center">
              <h2 className="text-xl font-bold text-gray-300">Abandonados</h2>
              <p className="text-[#1BA098] text-2xl">{estadisticas ? estadisticas.abandonados : 0}</p>
            </div>
          </div>
          <div className="space-y-4">
            {ultimosJuegos.map(juego => (
              <div key={juego.idCompletacion} className="border-2 border-[#DEB992] p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-300">{juego.nombreJuego}</h2>
                  <p className="text-[#1BA098]"><b>Añadido a:</b> {juego.estadoCompletacion}</p>
                  <p className="text-gray-400"><b>Fecha:</b> {new Date(juego.fechaFinCompletacion).toLocaleDateString()}</p>
                </div>
                <img
                  src={`/${juego.imagenJuego}`}
                  alt={juego.nombreJuego}
                  className="w-24 h-24 object-cover object-center rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
