import api from "../api/axios";
import { AlimentosApiResposta, ErrorProps } from "../types";

class Alimento {
    async buscaAlimento(query: string = ""): Promise<AlimentosApiResposta | ErrorProps> {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(`/alimento?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Dados da API:", data); // Log para ver o que a API está retornando

            return data; 
        } catch (error: any) {
            return { erro: error.message };
        }
    }
}

const buscaAlimento = new Alimento();
export default buscaAlimento;
