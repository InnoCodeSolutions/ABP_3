import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async login(req: Request, res: Response) {
    const { mail, password } = req.params;

    if (!mail || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const { status, data } = await this.authService.login(mail, password);
    res.status(status).json(data);
  }

  public async register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const { status, data } = await this.authService.register(email, password);
    res.status(status).json(data);
  }
}
