import { Router } from 'express';
import { AuthService } from '../service/AuthService';
import { AuthController } from '../controllers/Login';

const routes = Router();

const authService = new AuthService({
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
});


const authController = new AuthController(authService);

routes.post('/login', (req, res) => authController.login(req, res));

export default routes;
