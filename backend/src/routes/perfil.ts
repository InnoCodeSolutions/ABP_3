// routes/perfil.ts
import { Router } from 'express';
import perfilController from '../controllers/Perfil';

import { authMiddleware } from '../middlewares'; // Importar o middleware

const router = Router();

// Aplicar middleware de autenticação nas rotas de perfil
router.get('/', perfilController.list); // Obter perfil do usuário
router.post('/',  perfilController.create); // Criar perfil do usuário
router.put('/',  perfilController.update); // Atualizar perfil do usuário
router.delete('/',  perfilController.delete); // Deletar perfil do usuário

export default router;
