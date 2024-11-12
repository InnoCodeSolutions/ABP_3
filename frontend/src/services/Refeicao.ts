import api from "../api/axios";
import { RefeicoesApiResposta, ErrorProps, RefeicaoRequest } from "../types";

class Refeicao {

    async buscarRefeicoes(): Promise<RefeicoesApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await api.get(`/Refeicao`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Dados das refeições da API:", data);
            return data;
        } catch (error: any) {
            console.error("Erro ao buscar refeições:", error.message);
            return { erro: error.message };
        }
    }


    async adicionarRefeicao(refeicaoData: RefeicaoRequest): Promise<RefeicoesApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await api.post(`/Refeicao`, refeicaoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Refeição adicionada:", data);
            return data;
        } catch (error: any) {
            console.error("Erro ao adicionar refeição:", error.message);
            return { erro: error.message };
        }
    }

    async deletarRefeicao(id: string): Promise<RefeicoesApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await api.delete(`/Refeicao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Refeição deletada:", data);
            return data;
        } catch (error: any) {
            console.error("Erro ao deletar refeição:", error.message);
            return { erro: error.message };
        }
    }
}

const refeicaoService = new Refeicao();
export default refeicaoService;
