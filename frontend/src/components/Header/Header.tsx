import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import '../../index.css';
import { useAuth } from '../../context/AuthContext'; // Importa o contexto de autenticação

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth(); // Usa o hook de autenticação
  const dropdownTimeout = useRef<number | null>(null);

  const handleLogout = () => {
    logout(); // Chama a função de logout
    window.location.href = '/'; // Redireciona para a página inicial após logout
  };

  const handleMouseEnter = () => {
    // Limpa o timeout anterior se o mouse entrar novamente
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Configura um timeout para fechar o menu após um pequeno atraso
    dropdownTimeout.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Atraso de 200ms
  };

  return (
    <header className="flex justify-between items-center w-full px-8 py-4 bg-lime-300 text-lime-950">
      <div className="flex items-center space-x-4">
        <a href="/Home">
          <img
            src="/sapoPreto.png"
            alt="Logo"
            className="h-6 object-contain"
          />
        </a>
        <div className="h-10 border-l border-black"></div>
        <p className="text-3xl font-bold font-nort">
          ramg.o
        </p>
      </div>
      <nav className="flex space-x-4">
        <Button variant="transparent" className="px-4 py-2">
          <a href='/Home'>Home</a>
        </Button>
        <Button variant="transparent" className="px-4 py-2">
          <a href='/Cadastro'>Perfil</a>
        </Button>
        <Button variant="transparent" className="px-4 py-2">
          <a href='/Alimento'>Alimentos</a>
        </Button>
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
              onMouseEnter={handleMouseEnter}  // Mantém o menu aberto enquanto o mouse estiver nele
              onMouseLeave={handleMouseLeave}  // Fecha o menu quando o mouse sair do dropdown
            >
              <a href="/novarefeicao" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Monte sua refeição
              </a>
              <a href="/minhas-refeicoes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Minhas refeições
              </a>
            </div>
          )}
        </div>
        <Button variant="transparent" className="px-4 py-2" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Header;
