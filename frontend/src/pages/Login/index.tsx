import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useAuth } from '../../context/AuthContext'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa o hook de autenticação

  const handleCreate = async (mail: string, password: string,name:string,lastName:string) => {
    try {
      const response = await axios.post('http://localhost:3001/cadastro', { mail, password,name,lastName });
      console.log('Registro bem-sucedido:', response.data);
      alert('Registro criado com sucesso! Agora você pode fazer login.'); // Alerta de sucesso
      navigate('/login'); // Redireciona para a página de login após registro
    } catch (error:any) {
      console.error('Falha ao registrar:', error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Mostra a mensagem de erro retornada pelo back-end
      } else {
        alert('Falha ao registrar. Verifique o e-mail e tente novamente.'); // Mensagem genérica
      }
    }
  };

  const handleLogin = async (mail: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { mail, password });
      console.log('Login bem-sucedido:', response.data);

      if (response.data.token) {
        // Chama a função de login do contexto para armazenar o token e o e-mail
        login(response.data.token, mail);
        navigate('/home'); // Redireciona para a página inicial após login
      } else {
        alert('Falha ao fazer login. Token não recebido.');
      }
    } catch (error:any) {
      console.error('Falha ao fazer login:', error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Mostra a mensagem de erro retornada pelo back-end
      } else {
        alert('Falha ao fazer login. Verifique suas credenciais e tente novamente.'); // Mensagem genérica
      }
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} onRegister={handleCreate} />
    </div>
  );
};

export default LoginPage;
