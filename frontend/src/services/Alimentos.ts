import api from "../api/axios";
import { AlimentosApiResposta, ErrorProps } from "../types";

class Alimento {
    async buscaAlimento(query: string = ""): Promise<AlimentosApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("authToken");

            // Realiza a requisição GET com o token no header
            const { data } = await api.get(`/alimento?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclui o token de autenticação
                },
            });

            console.log("Dados da API:", data); // Log para ver o que a API está retornando

            return data; 
        } catch (error: any) {
            console.error("Erro ao buscar alimento:", error.message); // Log de erro
            return { erro: error.message }; // Retorna o erro
        }
    }
}

const buscaAlimento = new Alimento();
export default buscaAlimento;
