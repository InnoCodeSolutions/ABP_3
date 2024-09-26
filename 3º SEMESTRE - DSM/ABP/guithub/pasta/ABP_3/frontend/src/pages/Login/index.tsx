import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

const UserPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = async (mail: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/cadastro', { mail, password });
      console.log('Registration successful:', response.data);
      // Redirecionar para a página de login após um registro bem-sucedido
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Exibir uma mensagem de erro para o usuário
      alert('Falha ao registrar. Verifique o e-mail e tente novamente.');
    }
  };

  const handleLogin = async (mail: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { mail, password });
      console.log('Login successful:', response.data);
      // Redirecionar para a página inicial após um login bem-sucedido
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      // Exibir uma mensagem de erro para o usuário
      alert('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} onRegister={handleCreate} />
    </div>
  );
};

export default UserPage;
