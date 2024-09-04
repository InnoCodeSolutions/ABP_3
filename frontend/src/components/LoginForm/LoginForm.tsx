import React, { useState } from 'react';
import { Button } from '../Button';
import '../../index.css'; 

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isRegistering) {
      onRegister(username, password);
    } else {
      onLogin(username, password);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[600px] h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full pt-4 pl-6">
          <p className=" text-4xl font-nort">ramg.o</p>
        </div>
        <div className="flex w-full h-full">
          {/* Formulário de Login */}
          <div className={`flex-none w-7/12 h-full bg-white p-6 flex items-center justify-center`}>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <Button type="submit">
                {isRegistering ? 'Cadastrar' : 'Login'}
              </Button>
            </form>
          </div>
          {/* Seção de Registro */}
          <div className={`flex-none w-5/12 h-full bg-lime-300 text-lime-950 flex items-center justify-center`}>
            <div className=" p-2 rounded-lg">
              <p className="text-xl font-bold mb-4 text-center">
                Ainda não tem cadastro?
              </p>
              <p className="text-sm text-center mb-4">
                Cadastre-se agora mesmo!
              </p>
              <div className="flex justify-center items-center pt-8">
              <Button onClick={toggleMode} variant="secondary" className="flex justify-center p-2">
                {isRegistering ? 'Voltar para Login' : 'Cadastre-se'}
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
