import { Router } from 'express';
import { alimentoController } from '../controllers/Alimento'; // Verifique o caminho

const router = Router();

router.post('/', alimentoController.create);  // Criação de alimentos
router.get('/', alimentoController.list);       // Listagem de alimentos
router.put('/', alimentoController.update);   // Atualização de alimentos
router.delete('/', alimentoController.delete); // Exclusão de alimentos

export default router;
