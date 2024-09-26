// routes/index.ts
import { Router } from 'express';
import userRoutes from './usuario'; // Importar rotas de usuário
import perfilRoutes from './perfil'; // Importar rotas de perfil
import alimentosRoutes from './alimentosRoutes'; // Importar rotas de alimentos
import { authMiddleware } from '../middlewares'; // Importar middleware de autenticação
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

// Rotas que não requerem autenticação
routes.use('/cadastro', userRoutes); // Cadastro de usuários
routes.post('/login', login); // Rota de login

// Rotas que requerem autenticação
routes.use('/perfil', perfilRoutes); // Perfil do usuário
routes.use('/alimento', alimentosRoutes); // Rotas de alimentos

// Aceita qualquer método HTTP ou URL não definida
routes.all('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

export default routes;
