import { Request, Response } from 'express';
import Alimento from '../models/Alimento';

class AlimentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      id,
      preparacao,
      energia,
      proteina,
      lipidios,
      carboidrato,
      // Add other fields as needed
    } = req.body;

    try {
      const document = new Alimento({
        id,
        preparacao,
        energia,
        proteina,
        lipidios,
        carboidrato,
        // Add other fields as needed
      });

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  
public async list(req: Request, res: Response): Promise<Response> {
  try {
      const { descricao, page = 1, dataSize } = req.body; // Permite dataSize ser opcional
      const filter: any = {};

      // Verifique se 'descricao' é uma string antes de criar a expressão regular
      if (typeof descricao === 'string') {
          filter.descricao = new RegExp(descricao, 'i');
      }

      // Conte o total de documentos
      const total = await Alimento.countDocuments(filter);
      const sizePerPage = dataSize || total; // Se dataSize for passado, usa ele, senão usa total
      const totalPages = Math.ceil(total / sizePerPage);
      const offset = (page - 1) * sizePerPage;

      // Busque os itens do banco com limite dinâmico
      const spents = await Alimento.find(filter)
          .sort({ datetime: -1 })
          .limit(sizePerPage) // Limita ao tamanho dinâmico
          .skip(offset); // Controla a página atual

      return res.json({
          pages: totalPages,
          currentPage: page,
          count: total,
          spent: spents,
      });
  } catch (error: any) {
      return res.status(500).json({ message: error.message });
  }
}

// antigo list que pode ou não ser usado. 
/*
  public async list(req: Request, res: Response): Promise<Response> {
    try {
        const { descricao, page = 1 } = req.body;
        const dataSize = 20000; // Defina o número de itens por página

        const filter: any = {};
        // Verifique se 'descricao' é uma string antes de criar a expressão regular
        if (typeof descricao === 'string') {
            filter.descricao = new RegExp(descricao, 'i');
        }

        const total = await Alimento.countDocuments(filter);
        const totalPages = Math.ceil(total / dataSize);
        const offset = (page - 1) * dataSize;

        const spents = await Alimento.find(filter)
            .sort({ datetime: -1 })
            .limit(dataSize)
            .skip(offset);

        return res.json({
            pages: totalPages,
            currentPage: page,
            count: total,
            spent: spents,
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
    */


  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      const object = await Alimento.findByIdAndDelete(id);
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
    const {
      id,
      preparacao,
      energia,
      proteina,
      lipidios,
      carboidrato,
      // Add other fields as needed
    } = req.body;

    try {
      const document = await Alimento.findById(id);
      if (!document) {
        return res.status(404).json({ message: 'Alimento não encontrado' });
      }
      document.set({
        preparacao,
        energia,
        proteina,
        lipidios,
        carboidrato,
        // Add other fields as needed
      });

      const updated = await document.save();
      return res.json(updated);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const alimentoController = new AlimentoController();
