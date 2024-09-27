// routes/perfil.ts
import { Router } from 'express';
import perfilController from '../controllers/Perfil';

import { authMiddleware } from '../middlewares'; // Importar o middleware

const router = Router();


// Aplicar middleware de autenticação nas rotas de perfil
router.get('/', authMiddleware, perfilController.list); // Obter perfil do usuário
router.post('/', authMiddleware, perfilController.create); // Criar perfil do usuário
router.put('/', authMiddleware, perfilController.update); // Atualizar perfil do usuário
router.delete('/', authMiddleware, perfilController.delete); // Deletar perfil do usuário

export default router;
