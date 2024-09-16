import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import LoginForm from '../../components/LoginForm/LoginForm'; // Assumindo que LoginForm pode ser reutilizado para o cadastro

const UserPage: React.FC = () => {
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  const handleCreate = async (mail: string, password: string, profile: string) => {
    try {
      const response = await axios.post('http://localhost:3001/cadastro', { mail, password, profile });
      console.log('Registration successful:', response.data);
      // Redirecionar para a página de login após um registro bem-sucedido
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Adicione a lógica para tratar o erro de registro, como mostrar uma mensagem de erro
    }
  };

  // No caso, pode não ser necessário o handleLogin aqui, mas deixamos como exemplo.
  const handleLogin = async (mail: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { mail, password });
      console.log('Login successful:', response.data);
      // Redirecionar para a página inicial após um login bem-sucedido
      navigate('/homes');
    } catch (error) {
      console.error('Login failed:', error);
      // Adicione a lógica para tratar o erro de login, como mostrar uma mensagem de erro
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} onRegister={handleCreate} />
    </div>
  );
};

export default UserPage;
