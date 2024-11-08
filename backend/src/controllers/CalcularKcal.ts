import { Request, Response } from 'express';
import RefeicaoModel from '../models/Refeicao';
import AlimentoModel from '../models/Alimento';

function formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

// Classe Refeicao
class Refeicao {
    // Método para adicionar um alimento a uma refeição específica
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { refeicao, nomePersonalizado, descricao } = req.body;
            console.log("dados vindo do frontend", req.body);

            // Verificação se o tipo de refeição não é nulo ou vazio
            if (!refeicao || refeicao.trim() === '') {
                return res.status(400).json({ message: 'O tipo de refeição é obrigatório e não pode ser nulo ou vazio.' });
            }

            // Busca o alimento pela descrição no banco de dados
            const alimento = await AlimentoModel.findOne({ descricao });
            if (!alimento) {
                return res.status(404).json({ message: 'Alimento não encontrado' });
            }

            // Cria ou atualiza uma refeição específica com o nome personalizado, se fornecido
            const query = nomePersonalizado
                ? { tipo: refeicao, nomePersonalizado }
                : { tipo: refeicao };
                
            const novaRefeicao = await RefeicaoModel.findOneAndUpdate(
                query,
                { $push: { alimentos: alimento } },
                { new: true, upsert: true }
            );

            return res.status(201).json({ 
                message: `Alimento adicionado à ${refeicao} com sucesso!`, 
                refeicao: novaRefeicao 
            });
        } catch (error: any) {
            console.error('Erro ao adicionar alimento à refeição:', error);
            return res.status(500).json({ message: 'Erro ao adicionar alimento à refeição', error: error.message || error });
        }
    };

    // Método para listar os alimentos em uma refeição específica e calcular calorias
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const { tipo, nomePersonalizado } = req.query;

            // Monta a query de busca para o tipo de refeição e nome personalizado, se fornecido
            const query = {
                ...(tipo && { tipo }),
                ...(nomePersonalizado && { nomePersonalizado })
            };

            // Busca todas as refeições com os alimentos associados e filtra pelo tipo/nome personalizado
            const refeicoesEncontradas = await RefeicaoModel.find(query).populate('alimentos');

            if (!refeicoesEncontradas || refeicoesEncontradas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma refeição encontrada.' });
            }
    
            // Filtra as refeições se um tipo for fornecido
            const refeicoesFiltradas = tipo
                ? refeicoesEncontradas.filter(refeicao =>
                    refeicao.tipo.toLowerCase().includes(tipo.toString().toLowerCase())
                )
                : refeicoesEncontradas; // Se não houver tipo, usa todas as refeições
    
            // Mapeia cada refeição para calcular as calorias totais e estruturar os dados
            const refeicoesComAlimentos = await Promise.all(refeicoesEncontradas.map(async (refeicao) => {
                let totalCalorias = 0;
                const alimentodata: any = refeicao.updatedAt; // Obtenha a data de atualização
                const dataRefeicao = formatDate(alimentodata);
                // Adicionando o console.log para mostrar alimentodata
    
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
                        caloriasAlimento: alimento.energia, // Calorias do alimento no banco de dados
                    };
                });
                return {
                    tipo: refeicao.tipo,
                    nomePersonalizado: refeicao.nomePersonalizado,
                    alimentos: alimentosComCalorias,
                    totalCaloriasRefeicao: totalCalorias,
                    alimentodate: dataRefeicao, // Corrigido para chamar formatDate corretamente
                };
            }));

            return res.json(refeicoesComAlimentos);
        } catch (error: any) {
            console.error('Erro ao listar alimentos:', error);
            return res.status(500).json({ message: 'Erro ao listar alimentos', error: error.message || error });
        }
    }
    

    // Método para deletar alimentos de uma refeição específica
    public async delete(req: Request, res: Response): Promise<Response> {
        const { refeicao, nomePersonalizado, descricao } = req.body;
        try {
            // Define a query para buscar a refeição específica usando tipo e nome personalizado, se houver
            const query = nomePersonalizado
                ? { tipo: refeicao, nomePersonalizado }
                : { tipo: refeicao };

            // Remove o alimento da refeição pelo tipo, nome personalizado (se houver) e descrição
            const refeicaoAtualizada = await RefeicaoModel.findOneAndUpdate(
                query,
                { $pull: { alimentos: { descricao: descricao } } },
                { new: true }
            );

            // Se não encontrar a refeição ou o alimento, retorna erro
            if (!refeicaoAtualizada) {
                return res.status(404).json({ message: 'Refeição não encontrada' });
            }

            // Busca novamente a refeição com alimentos atualizados para confirmar a remoção
            const refeicaoConfirmada = await RefeicaoModel.findOne(query).populate('alimentos');
            
            // Confirma se o alimento foi realmente removido
            const alimentoRemovido = !refeicaoConfirmada?.alimentos.some((alimento: any) => alimento.descricao === descricao);
            if (!alimentoRemovido) {
                return res.status(404).json({ message: 'Alimento não encontrado na refeição' });
            }

            return res.status(200).json({ 
                message: `Alimento '${descricao}' removido da refeição '${refeicao}' com sucesso`, 
                refeicao: refeicaoConfirmada 
            });
        } catch (error: any) {
            console.error('Erro ao deletar alimento da refeição:', error);
            return res.status(500).json({ message: 'Erro ao deletar alimento da refeição', error: error.message || error });
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
