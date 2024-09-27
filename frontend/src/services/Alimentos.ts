import api from "../api/axios";
import { ItemAlimentoBackendProps, ErrorProps } from "../types";

class Alimento {
    async buscaAlimento(): Promise<ItemAlimentoBackendProps[] | ErrorProps> {
        try {
            const token = localStorage.getItem("token")
            
            const { data } = await api.get("/alimento",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            })
            console.log(data);
            return data;
        } catch (error: any) {
            return { erro: error.message };
        }
    };
};

const buscaAlimento = new Alimento();
export default buscaAlimento