import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import CadastroPage from './pages/Cadastro';
import AddAlimentoPage from './pages/AddAlimento';
import { AuthProvider, useAuth } from './context/AuthContext';
import NovaRefeicao from './pages/NovaRefeicao';


const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redireciona a rota padrão para /login */}
          <Route path="/cadastro" element={<CadastroPage />} />
<<<<<<< HEAD
          <Route path="/alimento" element={<AddAlimentoPage /> } />
          <Route path="/home" element={<Home /> } />
=======
          <Route path="/alimento" element={<ProtectedRoute element={<AddAlimentoPage />} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/novarefeicao" element={<NovaRefeicao/>} />
>>>>>>> f42112d8b8a4edb3ecb3d9b51806644c599c011a
          {/* Adicione outras rotas aqui */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;