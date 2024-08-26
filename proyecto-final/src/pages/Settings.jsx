import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.nombreUsuario);
      setEmail(user.emailUsuario);
    }
  }, [user]);

  const handleDelete = async () => {
    if (!user) return;

    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/users/${user.idUsuario}`);
      logout();
      navigate('/');
    } catch (err) {
      console.error('Error al eliminar la cuenta', err);
      alert('Hubo un error al eliminar la cuenta.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.put(`http://localhost:3001/api/users/${user.idUsuario}`, {
        nombreUsuario: username,
        emailUsuario: email,
        claveUsuario: user.claveUsuario, //Esto esta pero no funciona aun
      });
      alert('Cuenta actualizada correctamente');
    } catch (err) {
      console.error('Error al actualizar la cuenta', err);
      alert('Hubo un error al actualizar la cuenta.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-[#DEB992]">Configuración</h2>
      <form onSubmit={handleUpdate} className="border border-[#DEB992] p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-md font-medium text-[#1BA098]">Nombre de Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-[#1BA098]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-[#1BA098] text-white rounded-md py-2 px-4 hover:bg-[#DEB992] transition-colors duration-300">
          Actualizar
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-800 transition-colors duration-300"
      >
        Eliminar Cuenta
      </button>
    </div>
  );
};

export default Settings;
