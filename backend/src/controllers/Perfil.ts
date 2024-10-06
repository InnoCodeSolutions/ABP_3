import { Request, Response } from "express";
import { Perfil } from "../models";

const activityFactors: { [key: string]: number } = {
  sedentario: 1.2,
  pouca: 1.375,
  medio: 1.55,
  muito: 1.725,
  extra: 1.9
};

// Função para calcular a TMB usando a fórmula de Mifflin-St Jeor
function calculateTMB(peso: number, altura: number, idade: number, genero: 'masculino' | 'feminino'): number {
  if (genero !== 'masculino') {
    return 10 * peso + 6.25 * altura - 5 * idade - 161;
  }
  return 10 * peso + 6.25 * altura - 5 * idade + 5;
}

// Função para calcular a TMB ajustada com base no nível de atividade física
function calculateAdjustedTMB(peso: number, altura: number, idade: number, genero: 'masculino' | 'feminino', atividade: string): number {
  const tmb = calculateTMB(peso, altura, idade, genero);
  const activityFactor = activityFactors[atividade] || 1.2; // Usar fator sedentário por padrão se não encontrado
  return tmb * activityFactor;
}

class Perfils {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id, genero,nome, peso, idade, altura, atividade } = req.body;

    try {
      // Verifica se já existe um perfil associado ao usuário (usando o ID do usuário)
      const existingProfile = await Perfil.findOne({ id });
      if (existingProfile) {
        return res.status(400).json({ message: "Já existe um perfil criado para este usuário." });
      }

      // Calcula a TMB antes de criar o documento
      const tmb = calculateAdjustedTMB(peso, altura, idade, genero, atividade);

      // Cria uma instância do modelo com o valor de TMB calculado
      const document = new Perfil({ id, genero, peso, nome, idade, altura, atividade, tmb });

      // Salva o documento no banco de dados
      const resp = await document.save();

      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // Código 11000 e 11001 indicam violação de restrição única (índice duplicado)
        return res.status(400).json({ message: "Erro ao cadastrar perfil. O perfil pode já existir." });
      } else if (error && error.errors["peso"]) {
        return res.status(400).json({ message: error.errors["peso"].message });
      } else if (error && error.errors["idade"]) {
        return res.status(400).json({ message: error.errors["idade"].message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const objects = await Perfil.find().sort({ id: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: _id } = req.body; // _id do registro a ser excluído
    try {
      const object = await Perfil.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: "Registro excluído com sucesso" });
      } else {
        return res.status(404).json({ message: "Registro inexistente" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { peso, idade, altura } = req.body;
    const { id } = res.locals; // Presumindo que o ID do perfil está disponível no contexto local
    try {
      // Busca o usuário existente na coleção antes de fazer o update
      const document = await Perfil.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Usuário inexistente" });
      }
      // Atualiza os campos
      document.peso = peso;
      document.idade = idade;
      document.altura = altura;
      // Ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.status(400).json({ message: "Este e-mail já está em uso" });
      } else if (error && error.errors["mail"]) {
        return res.status(400).json({ message: error.errors["mail"].message });
      } else if (error && error.errors["password"]) {
        return res.status(400).json({ message: error.errors["password"].message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new Perfils();
