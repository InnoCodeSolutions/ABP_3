// routes/alimentosRoutes.ts
import { Router } from 'express';
import { alimentoController } from '../controllers/Alimento'; // Verifique o caminho
import { authMiddleware } from '../middlewares'; // Importar o middleware

const router = Router();


// Aplicar middleware de autenticação nas rotas de alimentos
router.post('/', authMiddleware, alimentoController.create); // Criação de alimentos
router.get('/', authMiddleware, alimentoController.list); // Listagem de alimentos
router.put('/', authMiddleware, alimentoController.update); // Atualização de alimentos
router.delete('/', authMiddleware, alimentoController.delete); // Exclusão de alimentos



export default router;
