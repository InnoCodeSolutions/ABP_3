import React, { useState } from 'react';
import { Button } from '../Button';


interface LoginFormProps {
  onLogin: (mail: string, password: string) => void;
  onRegister: (mail: string, password: string, name: string,lastName: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(mail, password, name,lastName);
    } else {
      onLogin(mail, password);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[800px] h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex w-full h-full ease-in-out">

          {/* Seção de Inputs e Logo */}
          <div className={`flex-none ${isRegistering ? 'order-2 w-7/12' : 'order-1 w-7/12'} h-full p-6 flex items-center justify-center bg-white`}>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="E-mail"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Senha"
                      value={password}
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
          <div className={`flex-none ${isRegistering ? 'order-1 w-5/12' : 'order-2 w-5/12'} h-full flex items-center justify-center bg-lime-300 text-lime-950`}>
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
