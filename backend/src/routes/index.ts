import { Router, Request, Response } from "express";
import user from './usuario';

const routes = Router();

routes.use("/cadastro", user);

//aceita qualquer método HTTP ou URL


export default routes;