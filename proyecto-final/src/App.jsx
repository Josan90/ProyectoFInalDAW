import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Guias from './pages/Guias';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Biblioteca from './pages/Biblioteca';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Juego from './components/Juego';
import Contacto from './pages/Contacto';
import UserProfile from './pages/UserProfile';
import AlanWake2Guide from './components/Guias/AlanWake2Guide';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guias" element={<Guias />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/juego/:idJuego" element={<Juego />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/configuracion" element={<Settings />} />
            <Route path="/guia/alan-wake-2" element={<AlanWake2Guide />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
