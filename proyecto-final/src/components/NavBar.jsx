import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };

  const closeMenus = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenus);
    return () => {
      document.removeEventListener('mousedown', closeMenus);
    };
  }, []);

  return (
    <nav className="bg-[#050c1a] border-b-2 border-[#DEB992]" ref={menuRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-[#DEB992] text-3xl font-bold">
              UltimaGuias
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="text-[#cbd5e1] hover:text-[#DEB992] px-3 py-2 rounded-md text-md font-medium">
                  Inicio
                </Link>
                <Link to="/guias" className="text-[#cbd5e1] hover:text-[#DEB992] px-3 py-2 rounded-md text-md font-medium">
                  Guías
                </Link>
                <Link to="/biblioteca" className="text-[#cbd5e1] hover:text-[#DEB992] px-3 py-2 rounded-md text-md font-medium">
                  Biblioteca
                </Link>
                <Link to="/contacto" className="text-[#cbd5e1] hover:text-[#DEB992] px-3 py-2 rounded-md text-md font-medium">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="relative">
                  <button onClick={toggleProfileMenu} className="text-[#cbd5e1] hover:text-[#DEB992] px-3 py-2 rounded-md text-md font-medium">
                    {user.nombreUsuario}
                  </button>
                  {profileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileMenu}>
                          Perfil
                        </Link>
                        <Link to="/configuracion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileMenu}>
                          Configuración
                        </Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-[#cbd5e1] hover:text-[#DEB992] px-3 py-2 rounded-md text-md font-medium">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="text-[#cbd5e1] inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-[#DEB992] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Inicio
            </Link>
            <Link to="/guias" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Guías
            </Link>
            <Link to="/biblioteca" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Biblioteca
            </Link>
            <Link to="/contacto" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Contacto
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              {user ? (
                <>
                  <Link to="/perfil" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                    Perfil
                  </Link>
                  <Link to="/settings" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                    Configuración
                  </Link>
                  <button onClick={handleLogout} className="text-[#cbd5e1] hover:text-[#DEB992] block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-[#cbd5e1] hover:text-[#DEB992] block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
