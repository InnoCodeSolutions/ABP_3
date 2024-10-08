import { Request, Response } from 'express';
import  Alimento from '../models/Alimento';

// Classe Refeicao
class Refeicao {
    constructor() {
        // Inicialização de propriedades, se necessário
    }

    // Rota para cadastrar um alimento (Create)
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const novoAlimento = new Alimento({
                energia: req.body.energia,
                lipidios: req.body.lipidios,
                proteina: req.body.proteina,
                carboidrato: req.body.carboidrato
            });

            const alimentoSalvo = await novoAlimento.save();
            return res.status(201).json(alimentoSalvo);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao cadastrar alimento', error });
        }
    }

    // Rota para listar alimentos filtrados e calcular as calorias totais (Read)
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            // Captura os filtros enviados no corpo da requisição
            const filtros = req.body;

            // Filtra alimentos no banco de dados usando os parâmetros enviados no body
            const alimentos = await Alimento.find(filtros);

            if (alimentos.length === 0) {
                return res.status(404).json({ message: 'Nenhum alimento encontrado com os filtros fornecidos.' });
            }

            // Inicializar variáveis para somar os valores de macronutrientes
            let totalLipidios = 0;
            let totalProteina = 0;
            let totalCarboidrato = 0;

            // Iterar sobre os alimentos e somar os valores
            alimentos.forEach(alimento => {
                totalLipidios += alimento.lipidios;
                totalProteina += alimento.proteina;
                totalCarboidrato += alimento.carboidrato;
            });

            // Calcular as calorias totais chamando a função calcularCalorias diretamente
            const { caloriasLipidio, caloriasProteina, caloriasCarboidrato, totalCalorias } = calcularCalorias(totalLipidios, totalProteina, totalCarboidrato);

            // Retornar a lista de alimentos filtrados e as calorias totais
            return res.json({
                alimentos,
                caloriasTotais: {
                    caloriasLipidio,
                    caloriasProteina,
                    caloriasCarboidrato,
                    totalCalorias
                }
            });
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar alimentos', error });
        }
    }

    // Rota para atualizar um alimento (Update)
    public async update(req: Request, res: Response): Promise<Response> {
        const { energia, lipidios, carboidrato, proteina } = req.body;
        const { id } = req.params;

        try {
            const alimento = await Alimento.findById(id);
            if (!alimento) {
                return res.status(404).json({ message: "Alimento não encontrado" });
            }

            alimento.energia = energia;
            alimento.lipidios = lipidios;
            alimento.carboidrato = carboidrato;
            alimento.proteina = proteina;

            const alimentoAtualizado = await alimento.save();
            return res.json(alimentoAtualizado);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Rota para deletar um alimento (Delete)
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const alimentoDeletado = await Alimento.findByIdAndDelete(id);
            if (!alimentoDeletado) {
                return res.status(404).json({ message: 'Alimento não encontrado' });
            }
            return res.status(204).send(); // 204 No Content
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao deletar alimento', error });
        }
    }
}

// Função para converter macronutrientes em calorias (fora da classe Refeicao)
function calcularCalorias(lipidios: number, proteina: number, carboidrato: number): {
    caloriasLipidio: number; caloriasProteina: number; caloriasCarboidrato: number; totalCalorias: number;
}
{
    const caloriasLipidio = lipidios * 9; // 1g de lipídio = 9 calorias
    const caloriasProteina = proteina * 4; // 1g de proteína = 4 calorias
    const caloriasCarboidrato = carboidrato * 4; // 1g de carboidrato = 4 calorias
    const totalCalorias = caloriasLipidio + caloriasProteina + caloriasCarboidrato;

    return {
        caloriasLipidio,
        caloriasProteina,
        caloriasCarboidrato,
        totalCalorias
    };
}

export const RefeicaoController = new Refeicao();