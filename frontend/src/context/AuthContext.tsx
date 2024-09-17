import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, mail: string) => void;
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
    // Verificar se os dados de autenticação estão no localStorage e atualizar o estado
    const savedToken = localStorage.getItem('authToken');
    const savedMail = localStorage.getItem('mail');


    if (savedToken && savedMail) {
      setToken(savedToken);
      setMail(savedMail);

      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, mail: string) => {
    // Salvar os dados no localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('mail', mail);

    // Atualizar os estados locais
    setToken(token);
    setMail(mail);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remover os dados do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('mail');

    // Limpar os estados locais
    setToken(null);
    setMail(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, mail}}>
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
