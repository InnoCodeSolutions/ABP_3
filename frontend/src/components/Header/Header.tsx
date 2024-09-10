import React from 'react';
import { Button } from '../Button';
import '../../index.css';

const Header: React.FC = () => {
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
        <Button variant="transparent" className="px-4 py-2">
          Contato
        </Button>
      </nav>
    </header>
  );
};

export default Header;
