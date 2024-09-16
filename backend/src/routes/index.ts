import { Router } from 'express';
import userRoutes from './usuario'; // Importar rotas de usuário
import perfilRoutes from './perfil'; // Importar rotas de perfil

import alimentosRoutes from './alimentosRoutes'; // Importar rotas de alimentos
import { authMiddleware } from '../middlewares';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const routes = Router();

// Instanciar o AuthController
import { AuthService } from '../service/AuthService';
import { AuthController } from '../controllers/Login';
import login from './login';

const authService = new AuthService({
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
});
const authController = new AuthController(authService);

// Aplicar o middleware de autenticação apenas nas rotas que requerem autenticação
routes.use('/cadastro', userRoutes); // Não aplicar authMiddleware, pois é para cadastro
routes.use('/perfil', authMiddleware, perfilRoutes); // Aplicar authMiddleware
routes.post('/login', login); // Usar o método login do controlador

// Rota de listagem de alimentos
routes.use('/alimento', authMiddleware, alimentosRoutes); // Aplicar authMiddleware

// Aceita qualquer método HTTP ou URL
routes.all('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

export default routes;
