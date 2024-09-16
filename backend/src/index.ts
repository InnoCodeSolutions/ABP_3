import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import connect from './models/connection';

dotenv.config();

// Será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // Cria o servidor e coloca na variável app
const corsOptions = {
    origin: 'http://localhost:3050', // Altere para a origem desejada
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  };
// Suportar parâmetros JSON no body da requisição
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
// Conecta ao MongoDB no início da aplicação
connect();

// Inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// Define a rota para o pacote /routes
app.use(routes);