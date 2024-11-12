import api from "../api/axios";
import { AlimentosApiResposta, ErrorProps, ItemAlimentoBackendProps } from "../types";

class Alimento {
    async buscaAlimento(query: string = "", page: number = 1, pageSize: number = 2000): Promise<AlimentosApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("authToken");
            // Realiza a requisição GET com o token no header
            const { data } = await api.get(`/alimento?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Dados da API:", data);
            return data; 
        } catch (error: any) {
            console.error("Erro ao buscar alimento:", error.message);
            return { erro: error.message }; 
        }
    }

    async adicionarAlimento(alimentoData: ItemAlimentoBackendProps): Promise<AlimentosApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("authToken");

            const { data } = await api.post(`/refeicao`, alimentoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Alimento adicionado:", data);
            return data;
        } catch (error: any) {
            console.error("Erro ao adicionar alimento:", error.message);
            return { erro: error.message };
        }
    }

}

const buscaAlimento = new Alimento();
export default buscaAlimento;
