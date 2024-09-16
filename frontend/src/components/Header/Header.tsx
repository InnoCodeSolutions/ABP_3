import React, { useState } from 'react';
import { Button } from '../Button';
import '../../index.css';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center w-full px-8 py-4 bg-lime-300 text-lime-950">
      <div className="flex items-center space-x-4">
        <img
          src="/sapoPreto.png"
          alt="Logo"
          className="h-6 object-contain"
        />
        <div className="h-10 border-l border-black"></div>
        <p className="text-3xl font-bold font-nort">
          ramg.o
        </p>
      </div>
      <nav className="flex space-x-4">  
        <Button variant="transparent" className="px-4 py-2">
          Home
        </Button>
        <Button variant="transparent" className="px-4 py-2">
          Sobre
        </Button>
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
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
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <a href="/novarefeicao" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Monte sua refeição
              </a>
              <a href="/minhas-refeicoes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Minhas refeições
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
