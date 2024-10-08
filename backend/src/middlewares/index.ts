import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis do .env

interface JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: string; // O campo 'user' vai ser adicionado após a verificação do token
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header de autorização está presente
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do header

  // Verifica se o token foi extraído corretamente
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const secret = process.env.JWT_SECRET; // Obtém o segredo do .env
  if (!secret) {
    throw new Error('JWT_SECRET não definido no ambiente.');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    const payload = decoded as JwtPayload; // Tipagem do payload JWT
    req.user = payload.userId; // Adiciona o ID do usuário à requisição
    next(); // Prossegue para a próxima função ou rota
  });
};
