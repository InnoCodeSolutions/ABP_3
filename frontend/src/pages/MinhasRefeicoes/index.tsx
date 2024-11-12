import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ItemRefeicao from "../../components/Refeicao/ItemRefeicao";
import axios from "axios";

const RefeicaoPage: React.FC = () => {
    // Estado para armazenar a lista de refeições e o estado de carregamento
    const [refeicoes, setRefeicoes] = useState<any[]>([]); // Mudamos para um array
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Função para buscar as refeições
        const fetchRefeicoes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/refeicao');
                console.log(response.data); // Verifique os dados recebidos
                setRefeicoes(response.data); // Define a lista de refeições recebida
            } catch (error) {
                console.error('Erro ao buscar as refeições:', error);
                setRefeicoes([]); // Em caso de erro, garante que o estado das refeições seja um array vazio
            } finally {
                setLoading(false); // Atualiza o estado de carregamento
            }
        };

        fetchRefeicoes(); // Chama a função para buscar as refeições
    }, []);

    return (
        <div className="min-h-screen bg-gray-80">
            <Header />
            <main className="flex items-center justify-center pt-16 pb-16">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-4xl">
                    <h1 className="text-3xl font-semibold text-gray-800 pb-8">Minhas Refeições</h1>

                    {loading ? (
                        <div className="text-gray-600">Carregando...</div>
                    ) : refeicoes.length > 0 ? (
                        <div className="max-h-[60vh] overflow-y-auto"> {/* Container com overflow */}
                            {refeicoes.map((refeicao) => (
                                <ItemRefeicao
                                    key={refeicao.id} // Adicione uma chave única
                                    tipo={refeicao.tipo} // Passando o tipo da refeição
                                    alimentos={refeicao.alimentos} // Passando a lista de alimentos
                                    totalCaloriasRefeicao={refeicao.totalCaloriasRefeicao} // Passando o total de calorias da refeição
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-600">Nenhuma refeição encontrada.</div>
                    )}

                    <div className="flex justify-center items-center pt-3">
                        <h1 className="text-md text-gray-800">
                            Precisa Cadastrar sua Refeição? Cadastre-os 
                            <a href="/novarefeicao" className="text-blue-600 hover:underline"> aqui</a>
                        </h1>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RefeicaoPage;
