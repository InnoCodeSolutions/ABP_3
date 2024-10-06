import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (mail: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  mail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [mail, setMail] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedMail = localStorage.getItem('mail');

    if (savedToken && savedMail) {
      setToken(savedToken);
      setMail(savedMail);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (mail: string, password: string) => {
    try {
      // Fazer a requisição ao backend
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }), // Enviar os dados de login
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer login'); // Lidar com falhas na autenticação
      }

      const data = await response.json(); // Obter os dados do servidor

      // Salvar os dados no localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('mail', mail); // Assumindo que o e-mail é enviado ao backend para verificação

      // Atualizar os estados locais
      setToken(data.token);
      setMail(mail);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro de autenticação:", error);
      // Aqui você pode adicionar lógica adicional para lidar com erros (ex: exibir uma mensagem ao usuário)
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('mail');
    setToken(null);
    setMail(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, mail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
