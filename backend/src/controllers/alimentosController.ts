import { Request, Response } from 'express';
import { Alimento } from '../models/Alimento'; // Importando o modelo Alimento

class AlimentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, energia, proteina, lipideos, carboidratos, fibra } = req.body;
    try {
      const document = new Alimento({
        nome,
        energia,
        proteina,
        lipideos,
        carboidratos,
        fibra
      });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<Response> {
    try {
      const objects = await Alimento.find().sort({ nome: 'asc' });
      return res.json(objects);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: _id } = req.body;
    try {
      const object = await Alimento.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: 'Alimento excluído com sucesso' });
      } else {
        return res.status(404).json({ message: 'Alimento não encontrado' });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, nome, energia, proteina, lipideos, carboidratos, fibra } = req.body;
    try {
      const document = await Alimento.findById(id);
      if (!document) {
        return res.status(404).json({ message: 'Alimento não encontrado' });
      }
      document.nome = nome;
      document.energia = energia;
      document.proteina = proteina;
      document.lipideos = lipideos;
      document.carboidratos = carboidratos;
      document.fibra = fibra;

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new AlimentoController();
