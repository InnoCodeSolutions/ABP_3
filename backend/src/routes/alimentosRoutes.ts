import { Router } from 'express';
import controller from '../controllers/alimentosController'; // Verifique o caminho do controlador

const router = Router();

router.post('/create', controller.create);  // Criação de alimentos
router.get('/list', controller.list);       // Listagem de alimentos
router.put('/update', controller.update);   // Atualização de alimentos
router.delete('/delete', controller.delete); // Exclusão de alimentos

export default router;
