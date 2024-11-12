import { Request, Response } from 'express';
import RefeicaoModel from '../models/Refeicao';
import AlimentoModel from '../models/Alimento';

// Classe Refeicao
class Refeicao {
    // Método para adicionar um alimento a uma refeição específica
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { refeicao, descricao } = req.body;

            // Verificação se o tipo de refeição não é nulo ou vazio
            if (!refeicao || refeicao.trim() === '') {
                return res.status(400).json({ message: 'O tipo de refeição é obrigatório e não pode ser nulo ou vazio.' });
            }

            // Busca o alimento pela descrição no banco de dados
            const alimento = await AlimentoModel.findOne({ descricao });
            if (!alimento) {
                return res.status(404).json({ message: 'Alimento não encontrado' });
            }

            // Cria uma nova refeição ou adiciona à existente
            const novaRefeicao = await RefeicaoModel.findOneAndUpdate(
                { tipo: refeicao },
                { $push: { alimentos: alimento } },
                { new: true, upsert: true }
            );

            return res.status(201).json({ message: `Alimento adicionado à ${refeicao} com sucesso!`, refeicao: novaRefeicao });
        } catch (error: any) {
            console.error('Erro ao adicionar alimento à refeição:', error);
            return res.status(500).json({ message: 'Erro ao adicionar alimento à refeição', error: error.message || error });
        }
    };

    // Método para listar os alimentos em uma refeição específica e calcular calorias
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            // Pega o parâmetro de consulta para filtrar refeições pelo tipo
            const { tipo } = req.query;
    
            // Busca todas as refeições com os alimentos associados
            const refeicoesEncontradas = await RefeicaoModel.find({}).populate('alimentos');
    
            if (!refeicoesEncontradas || refeicoesEncontradas.length === 0) {
                return res.status(404).json({ message: `Nenhuma refeição encontrada.` });
            }
    
            // Filtra as refeições se um tipo for fornecido
            const refeicoesFiltradas = tipo
                ? refeicoesEncontradas.filter(refeicao => 
                    refeicao.tipo.toLowerCase().includes(tipo.toString().toLowerCase())
                )
                : refeicoesEncontradas; // Se não houver tipo, usa todas as refeições
    
            // Mapeia cada refeição para calcular as calorias totais e estruturar os dados
            const refeicoesComAlimentos = await Promise.all(refeicoesFiltradas.map(async (refeicao) => {
                let totalCalorias = 0;
                const alimentosComCalorias = refeicao.alimentos.map((alimento: any) => {
                    const {
                        lipidios,
                        proteina,
                        carboidrato,
                        caloriasLipidio,
                        caloriasProteina,
                        caloriasCarboidrato,
                        totalCalorias: caloriasTotais
                    } = calcularCalorias(alimento.lipidios, alimento.proteina, alimento.carboidrato);
                    
                    totalCalorias += caloriasTotais;
    
                    return {
                        descricao: alimento.descricao,
                        lipidios,
                        proteina,
                        carboidrato,
                        caloriasLipidio,
                        caloriasProteina,
                        caloriasCarboidrato,
                        totalCalorias: caloriasTotais, // Total de calorias do alimento
                        caloriasAlimento: alimento.energia, // Calorias do alimento como está no banco de dados
                    };
                });
    
                return {
                    tipo: refeicao.tipo,
                    alimentos: alimentosComCalorias,
                    totalCaloriasRefeicao: totalCalorias,
                };
            }));
    
            // Se não houver refeições filtradas, retorna uma mensagem
            if (refeicoesComAlimentos.length === 0) {
                return res.status(404).json({ message: `Nenhuma refeição encontrada para o tipo: "${tipo}"` });
            }
    
            return res.json(refeicoesComAlimentos); // Retorna todas as refeições com os dados
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar alimentos', error: error.message || error });
        }
    }
    

    // Método para atualizar as informações de um alimento específico
    public async update(req: Request, res: Response): Promise<Response> {
        const { energia, lipidios, carboidrato, proteina } = req.body;
        const { id } = req.params;

        try {
            const alimento = await AlimentoModel.findById(id);
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

    // Método para deletar um alimento específico
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const alimentoDeletado = await AlimentoModel.findByIdAndDelete(id);
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
    lipidios: number;
    proteina: number;
    carboidrato: number;
    caloriasLipidio: number;
    caloriasProteina: number;
    caloriasCarboidrato: number;
    totalCalorias: number;
} {
    const caloriasLipidio = lipidios * 9; // 1g de lipídio = 9 calorias
    const caloriasProteina = proteina * 4; // 1g de proteína = 4 calorias
    const caloriasCarboidrato = carboidrato * 4; // 1g de carboidrato = 4 calorias
    const totalCalorias = caloriasLipidio + caloriasProteina + caloriasCarboidrato;

    return {
        lipidios,
        proteina,
        carboidrato,
        caloriasLipidio,
        caloriasProteina,
        caloriasCarboidrato,
        totalCalorias
    };
}

export const RefeicaoController = new Refeicao();