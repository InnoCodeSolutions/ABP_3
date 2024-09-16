// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import CadastroPage from './pages/Cadastro';
import AddAlimentoPage from './pages/AddAlimento';
import LoginForm from './components/LoginForm/LoginForm';
import Login from './pages/Login';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/cadastro" element={<CadastroPage/>} />
        <Route path="/Alimento" element={<AddAlimentoPage/>} />
        {/* Adicione outras rotas aqui */}
      </Routes>
    </Router>
  );
};

export default App;
