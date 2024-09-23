import { Request, Response } from 'express';
import { Alimento } from '../models/Alimento'; // Corrija o caminho se necessário

class AlimentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      id,
      preparacao,
      energia,
      proteina,
      lipidios,
      carboidrato
      // fibra,
      // colesterol,
      // agsaturado,
      // agmono,
      // agpoli,
      // aglinoleico,
      // aglinolenico,
      // agtranstotal,
      // acucartotal,
      // acucaradicao,
      // calcio,
      // magnesio,
      // manganes,
      // fosforo,
      // ferro,
      // sodio,
      // sodioadicao,
      // potassio,
      // cobre,
      // zinco,
      // selenio,
      // retinol,
      // vitamina_a,
      // tiamina,
      // riboflavina,
      // niacina,
      // niacina_ne,
      // piridoxina,
      // cobalamina,
      // folato,
      // vitamina_d,
      // vitamina_e,
      // vitamina_c
    } = req.body;

    try {
      const document = new Alimento({
        id,
        preparacao,
        energia,
        proteina,
        lipidios,
        carboidrato
        // fibra,
        // colesterol,
        // agsaturado,
        // agmono,
        // agpoli,
        // aglinoleico,
        // aglinolenico,
        // agtranstotal,
        // acucartotal,
        // acucaradicao,
        // calcio,
        // magnesio,
        // manganes,
        // fosforo,
        // ferro,
        // sodio,
        // sodioadicao,
        // potassio,
        // cobre,
        // zinco,
        // selenio,
        // retinol,
        // vitamina_a,
        // tiamina,
        // riboflavina,
        // niacina,
        // niacina_ne,
        // piridoxina,
        // cobalamina,
        // folato,
        // vitamina_d,
        // vitamina_e,
        // vitamina_c
      });

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const { descricao, page = 1 } = req.body;
      const pageSize = 10;


      const filter: any = {};
      if (descricao) {
        filter.descricao = new RegExp(descricao, 'i');
      }


      const total = await Alimento.countDocuments(filter);

      const avgResult = await Alimento.aggregate([
        { $match: filter },
        { $group: { _id: null, average: { $avg: "$value" } } }
      ]);

      let averageSpent = "0.00";
      if (avgResult.length > 0 && avgResult[0].average !== null) {
        averageSpent = avgResult[0].average.toFixed(2);
      }

      const totalPages = Math.ceil(total / pageSize);

      const currentPage = page > totalPages ? totalPages : (page < 1 ? 1 : page);
      const offset = (currentPage - 1) * pageSize;

      const spents = await Alimento.find(filter, {
        descricao: 1,
        carboidrato_g: 1,
        proteina_g: 1,
        lipidios_g: 1,
        _id: false
      })
        .sort({ datetime: -1 })
        .limit(pageSize)
        .skip(offset);

      return res.json({
        pages: totalPages,
        currentPage,
        count: total,
        average: averageSpent,
        spent: spents,
      });

    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

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
      carboidrato
      // fibra,
      // colesterol,
      // agsaturado,
      // agmono,
      // agpoli,
      // aglinoleico,
      // aglinolenico,
      // agtranstotal,
      // acucartotal,
      // acucaradicao,
      // calcio,
      // magnesio,
      // manganes,
      // fosforo,
      // ferro,
      // sodio,
      // sodioadicao,
      // potassio,
      // cobre,
      // zinco,
      // selenio,
      // retinol,
      // vitamina_a,
      // tiamina,
      // riboflavina,
      // niacina,
      // niacina_ne,
      // piridoxina,
      // cobalamina,
      // folato,
      // vitamina_d,
      // vitamina_e,
      // vitamina_c
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
        carboidrato
        // fibra,
        // colesterol,
        // agsaturado,
        // agmono,
        // agpoli,
        // aglinoleico,
        // aglinolenico,
        // agtranstotal,
        // acucartotal,
        // acucaradicao,
        // calcio,
        // magnesio,
        // manganes,
        // fosforo,
        // ferro,
        // sodio,
        // sodioadicao,
        // potassio,
        // cobre,
        // zinco,
        // selenio,
        // retinol,
        // vitamina_a,
        // tiamina,
        // riboflavina,
        // niacina,
        // niacina_ne,
        // piridoxina,
        // cobalamina,
        // folato,
        // vitamina_d,
        // vitamina_e,
        // vitamina_c
      });
      const updated = await document.save();
      return res.json(updated);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const alimentoController = new AlimentoController();

