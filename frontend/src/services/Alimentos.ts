import api from "../api/axios";
import { ItemAlimentoBackendProps, ErrorProps } from "../types";

class Alimento {
    async buscaAlimento(): Promise<ItemAlimentoBackendProps[] | ErrorProps> {
        try {
            const { data } = await api.get("/");
            return data.spent
        } catch (error: any) {
            return { erro: error.message };
        }
    };
};

const buscaAlimento = new Alimento();
export default buscaAlimento