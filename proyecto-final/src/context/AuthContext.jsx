import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', payload);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  };

  const register = async (payload) => {
    try {
      await axios.post('http://localhost:3001/api/auth/register', payload);
    } catch (error) {
      throw new Error('Error al registrar');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
