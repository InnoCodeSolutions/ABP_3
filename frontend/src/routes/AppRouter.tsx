import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/Login';
import CadastroPage from '../pages/Cadastro';
import AddAlimentoPage from '../pages/AddAlimento';
import Home from '../pages/Home';
import NovaRefeicao from '../pages/NovaRefeicao';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />

            {/* Redirecionamento da rota raiz para /login */}
            <Route path="/"
                element={<Navigate to="/login" />} />

            <Route
                path="/alimento"
                element={<AddAlimentoPage />} />
            <Route
                path="/home"
                element={<Home />} />
            <Route
                path="/novarefeicao"
                element={<NovaRefeicao />} />

        </Routes>
    );
};

export default AppRoutes;
