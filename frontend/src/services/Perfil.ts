import api from "../api/axios";

class Perfil {
    async fazerCadastro(payload: any) {
        try {

            const token = localStorage.getItem("authToken");

            if (!token) {
                throw new Error("Token não encontrado. Usuário não autenticado.");
            }

            const response = await api.post('/perfil', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("dados vindo da pagina", payload);

            console.log("Cadastro realizado com sucesso:", response.data);
            return response.data;
        } catch (error) {

            console.error("Erro ao realizar o cadastro:", error);
            throw error;
        }
    }
}

export default new Perfil();
