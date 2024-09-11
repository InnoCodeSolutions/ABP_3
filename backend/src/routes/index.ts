import { Router, Request, Response } from "express";
import user from './usuario';
import perfil from './perfil';
import alimentosRoutes from './alimentosRoutes' // Importa a rota de alimentos


const routes = Router();

routes.use("/cadastro", user);
routes.use("/perfil", perfil);
// Rota de listagem de alimentos
routes.use('/alimento', alimentosRoutes); // Corrigido para incluir a barra no início


//aceita qualquer método HTTP ou URL


export default routes;