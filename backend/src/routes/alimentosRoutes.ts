import { Router } from 'express';
import { alimentoController } from '../controllers/alimentosController'; // Verifique o caminho

const router = Router();

router.post('/create', alimentoController.create);  // Criação de alimentos
router.get('/list', alimentoController.list);       // Listagem de alimentos
router.put('/update', alimentoController.update);   // Atualização de alimentos
router.delete('/delete', alimentoController.delete); // Exclusão de alimentos

export default router;
