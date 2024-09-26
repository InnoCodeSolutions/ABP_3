import jwt from 'jsonwebtoken';
import { User } from '../models';

interface AuthServiceOptions {
  jwtSecret: string;
  jwtExpiry: string;
}

export class AuthService {
  private jwtSecret: string;
  private jwtExpiry: string;

  constructor(options: AuthServiceOptions) {
    this.jwtSecret = options.jwtSecret;
    this.jwtExpiry = options.jwtExpiry;
  }

  async login(mail: string, password: string) {
    try {
      const user = await User.findOne({ mail, password }).exec();
      if (!user) {
        return { status: 401, data: { error: 'Credenciais inválidas' } };
      }

      const token = jwt.sign({ userId: user._id }, this.jwtSecret, { expiresIn: this.jwtExpiry });
      return { status: 200, data: { token } };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { status: 500, data: { error: 'Erro interno do servidor' } };
    }
  }

  async register(mail: string, password: string) {
    try {
      // Verificar se o e-mail já existe
      const existingUser = await User.findOne({ mail }).exec();
      if (existingUser) {
        return { status: 400, data: { error: 'E-mail já registrado' } };
      }

      // Criar um novo usuário
      const newUser = new User({ mail, password });
      await newUser.save();

      return { status: 201, data: { message: 'Usuário registrado com sucesso' } };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return { status: 500, data: { error: 'Erro interno do servidor' } };
    }
  }
}
