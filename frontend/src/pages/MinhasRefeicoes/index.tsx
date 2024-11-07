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
                        alimentodate :refeicao.alimentodate,
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
        <div className="min-h-screen bg-gray-80">
            <Header />
            <main className="flex items-center justify-center pt-16 pb-16">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-4xl">
                    <h1 className="text-3xl font-semibold text-gray-800 pb-8">Minhas Refeições</h1>

                    {loading ? (
                        <div className="text-gray-600">Carregando...</div>
                    ) : error ? (
                        <div className="text-red-600">{error}</div>
                    ) : refeicoes.length > 0 ? (
                        <div className="max-h-[60vh] overflow-y-auto">
                            {refeicoes.map((refeicao) => (
                                <ItemRefeicao
                                    key={refeicao.refeicao}
                                    tipo={refeicao.refeicao}
                                    alimentodate = {refeicao.alimentodate}
                                    nomePersonalizado={refeicao.nomePersonalizado} // Verifique se `nomePersonalizado` é passado
                                    alimentos={refeicao.alimentos}
                                    totalCaloriasRefeicao={refeicao.totalCaloriasRefeicao}
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
