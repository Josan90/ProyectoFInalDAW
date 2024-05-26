import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login, register } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering && password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const payload = isRegistering
        ? { nombreUsuario: username, emailUsuario: email, claveUsuario: password }
        : { emailUsuario: email, claveUsuario: password };

      if (isRegistering) {
        await register(payload);
        toggleForm();
      } else {
        await login(payload);
        navigate('/');
      }
    } catch (err) {
      setError('Error al autenticar. Verifique sus credenciales o intente más tarde.');
      console.error('Error de autenticación', err);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto mt-12 px-4">
      <div className="bg-white border border-[#DEB992] rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-[#1BA098] text-2xl font-bold mb-4 text-center">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-[#051622]">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#051622]">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#051622]">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#051622]">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          )}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Recordarme</label>
            </div>
            <a href="#" className="text-sm text-[#DEB992] hover:text-gray-800">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" className="bg-[#051622] text-white rounded-full py-2 w-full hover:bg-[#DEB992] hover:text-[#1BA098] transition-colors duration-300">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isRegistering ? '¿Ya tienes una cuenta?' : '¿Eres nuevo?'}{' '}
            <a href="#" className="text-[#1BA098] hover:text-[#DEB992]" onClick={toggleForm}>
              {isRegistering ? 'Inicia sesión aquí' : 'Crea una cuenta aquí'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
