// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  // Adicione outros campos conforme necessário
}

interface AuthenticatedRequest extends Request {
  user?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header de autorização está presente
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  // Verifica se o token foi extraído corretamente
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Obtém o segredo do ambiente
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET não definido no ambiente.');
  }

  jwt.verify(token, secret, (err, decoded) => {
    console.log('Token:', token); // Log do token recebido
    console.log('Decoded:', decoded); // Log do que foi decodificado

    // Verifica se ocorreu um erro ao decodificar o token
    if (err || !decoded) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    const payload = decoded as JwtPayload; // Tipagem do payload
    req.user = payload.userId; // Adiciona o userId à requisição
    next(); // Prossegue para a próxima função middleware ou rota
  });
};
