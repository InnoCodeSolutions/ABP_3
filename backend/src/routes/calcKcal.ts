// routes/calcKcalRoutes.ts
import { Router } from "express";
import {RefeicaoController} from "../controllers/CalcularKcal";

const router = Router();

router.get('/', RefeicaoController.list);
router.post('/', RefeicaoController.create);
router.put('/',  RefeicaoController.update);
router.delete('/', RefeicaoController.delete);

export default router;