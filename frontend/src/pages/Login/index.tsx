import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useAuth } from '../../context/AuthContext'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa o hook de autenticação

  const handleCreate = async (mail: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/cadastro', { mail, password });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Falha ao registrar. Verifique o e-mail e tente novamente.');
    }
  };

  const handleLogin = async (mail: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { mail, password });
      console.log('Login successful:', response.data);

      
      if (response.data.token) {
        // Chame a função de login do contexto para armazenar o token e o e-mail
        login(response.data.token, mail);
        navigate('/home');
      } else {
        alert('Falha ao fazer login. Token não recebido.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} onRegister={handleCreate} />
    </div>
  );
};

export default LoginPage;
