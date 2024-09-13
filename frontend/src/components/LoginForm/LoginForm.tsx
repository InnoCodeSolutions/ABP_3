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
      <div className="relative w-[800px] h-[400px] bg-white rounded-lg shadow-md overflow-hidden transition-all duration-0">
        <div className="flex w-full h-full transition-all duration-0 ease-in-out">

          {/* Seção de Inputs e Logo */}
          <div className={`flex-none ${isRegistering ? 'order-2 w-7/12 bg-white' : 'order-1 w-7/12 bg-white'} h-full p-6 flex items-center justify-center transition-all duration-0`}>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="flex items-center mb-4">
                <p className="text-3xl font-bold pr-2">
                  ramg.o
                </p>
                <div className="h-8 border-l-2 pr-2 border-black"></div>
                <img
                  src="/sapoPreto.png"
                  alt="Logo"
                  className="h-6 object-contain"
                />
              </div>

              {isRegistering ? (
                <>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="E-mail"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Senha"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <Button type="submit" className="bg-lime-300 text-lime-950 p-2 rounded-md">
                    Cadastrar
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="E-mail"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <Button type="submit" className="bg-lime-300 text-lime-950 p-2 rounded-md">
                    Login
                  </Button>
                </>
              )}
            </form>
          </div>

          {/* Seção de Alternância */}
          <div className={`flex-none ${isRegistering ? 'order-1 w-5/12 bg-lime-300 text-lime-950' : 'order-2 w-5/12 bg-lime-300 text-lime-950'} h-full flex items-center justify-center transition-all duration-0 ease-in-out`}>
            <div className="p-6 rounded-lg">
              <p className="text-xl font-bold mb-4 text-center">
                {isRegistering ? 'Já tem cadastro?' : 'Ainda não tem cadastro?'}
              </p>
              <p className="text-sm text-center mb-4">
                {isRegistering ? 'Faça login agora mesmo!' : 'Cadastre-se agora mesmo!'}
              </p>
              <div className="flex justify-center items-center">
              <Button onClick={toggleMode} variant="secondary" className="flex justify-center p-2 bg-black text-white">
                {isRegistering ? 'Ir para login' : 'Cadastre-se'}
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
