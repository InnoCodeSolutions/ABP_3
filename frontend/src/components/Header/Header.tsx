import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import '../../index.css';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const dropdownTimeout = useRef<number | null>(null);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="flex flex-wrap justify-between items-center w-full h-auto px-8 py-4 bg-lime-300 text-lime-950">
      {/* Logo e Título */}
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <a href="/Home">
          <img
            src='../img/sapoPreto.png'
            alt="Logo"
            className="h-6 object-contain"
          />
        </a>
        <div className="h-10 border-l border-black hidden sm:block"></div>
        <p className="text-2xl sm:text-3xl font-bold font-nort">
          ramg.o
        </p>
      </div>

      {/* Nav - Itens de navegação */}
      <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-4 sm:mt-0">
        <Button variant="transparent" className="px-4 py-2">
          <a href='/Home'>Home</a>
        </Button>
        <Button variant="transparent" className="px-4 py-2">
          <a href='/Cadastro'>Perfil</a>
        </Button>
        <Button variant="transparent" className="px-4 py-2">
          <a href='/Alimento'>Alimentos</a>
        </Button>

        {/* Dropdown para Refeições */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Button variant="transparent" className="px-4 py-2 flex items-center">
            Refeições
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="/novarefeicao" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Monte sua refeição
              </a>
              <a href="/refeicao" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Minhas refeições
              </a>
            </div>
          )}
        </div>

        {/* Botão de Logout */}
        <Button variant="transparent" className="px-4 py-2" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Header;
