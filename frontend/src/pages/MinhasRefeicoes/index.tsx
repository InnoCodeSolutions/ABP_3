import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ItemRefeicao from "../../components/Refeicao/ItemRefeicao";
import refeicaoService from "../../services/Refeicao";
import { RefeicoesApiResposta, Alimento, ItemAlimentoBackendProps } from "../../types";

const RefeicaoPage: React.FC = () => {
    const [refeicoes, setRefeicoes] = useState<RefeicoesApiResposta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRefeicoes = async () => {
            try {
                const response = await refeicaoService.buscarRefeicoes();
                if (Array.isArray(response)) {
                    const refeicoesFormatadas = response.map((refeicao) => ({
                        refeicao: refeicao.tipo,
                        alimentodate: refeicao.alimentodate,
                        nomePersonalizado: refeicao.nomePersonalizado || 'Nome da refeição não informado',
                        totalCaloriasRefeicao: refeicao.totalCaloriasRefeicao,
                        alimentos: refeicao.alimentos.map((alimento: ItemAlimentoBackendProps) => ({
                            ...alimento,
                            id: alimento.descricao, // Gera um ID único com base em 'descricao'
                            totalCalorias: alimento.totalCalorias, // Usa 'totalCalorias' da resposta da API
                        })) as Alimento[],
                    }));
                    setRefeicoes(refeicoesFormatadas);
                } else {
                    setError("Erro ao buscar as refeições. Tente novamente.");
                }
            } catch (error) {
                setError("Erro ao buscar as refeições. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchRefeicoes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="flex items-center justify-center pt-16 pb-16">
                <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-5xl">
                    <h1 className="text-4xl font-semibold text-gray-800 pb-8 text-center">Minhas Refeições</h1>

                    {loading ? (
                        <div className="text-gray-600 text-center">Carregando...</div>
                    ) : error ? (
                        <div className="text-red-600 text-center">{error}</div>
                    ) : refeicoes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-h-[70vh] overflow-y-auto">
                            {refeicoes.map((refeicao) => (
                                <ItemRefeicao
                                    key={refeicao.refeicao}
                                    tipo={refeicao.refeicao}
                                    nomePersonalizado={refeicao.nomePersonalizado} // Verifique se `nomePersonalizado` é passado
                                    alimentos={refeicao.alimentos}
                                    totalCaloriasRefeicao={refeicao.totalCaloriasRefeicao}
                                    alimentodate={refeicao.alimentodate}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-600 text-center">Nenhuma refeição encontrada.</div>
                    )}

                    <div className="flex justify-center items-center pt-8">
                        <h2 className="text-lg text-gray-800">
                            Precisa cadastrar sua refeição? Cadastre-a 
                            <a href="/novarefeicao" className="text-blue-600 hover:underline ml-1">aqui</a>
                        </h2>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RefeicaoPage;
