import { Router, Request, Response } from "express";
import user from './usuario';
import perfil from './perfil'

const routes = Router();

routes.use("/cadastro", user);
routes.use("/perfil", perfil)

//aceita qualquer método HTTP ou URL


export default routes;