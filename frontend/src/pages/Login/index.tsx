import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // Implementar lógica de login
    console.log(`Login with username: ${username} and password: ${password}`);
  };

  const handleRegister = (username: string, password: string) => {
    // Implementar lógica de registro
    console.log(`Register with username: ${username} and password: ${password}`);
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};

export default LoginPage;
