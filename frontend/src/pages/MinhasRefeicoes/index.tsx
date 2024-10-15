import React from "react" // Ajuste o caminho conforme necessário
import Header from "../../components/Header/Header"; // Supondo que você tenha um componente de cabeçalho
import ItemRefeicao from "../../components/Refeicao/ItemRefeicao";

const RefeicaoPage: React.FC = () => {
    // Exemplo de dados de refeições. Você pode substituir por dados reais ou uma lógica de geração.
    const refeicoes = [
        {
            nome: "Café da Manhã",
            tipo: "Café da Manhã",
            alimentos: [
                { descricao: "Pão Integral", quantidade: "2 fatias", calorias: 160 },
                { descricao: "Queijo", quantidade: "1 fatia", calorias: 70 },
            ],
            totalCalorias: 230,
        },
        {
            nome: "Almoço",
            tipo: "Almoço",
            alimentos: [
                { descricao: "Arroz Integral", quantidade: "1 xícara", calorias: 210 },
                { descricao: "Frango Grelhado", quantidade: "150g", calorias: 250 },
                { descricao: "Salada", quantidade: "1 prato", calorias: 50 },
            ],
            totalCalorias: 510,
        },
        {
            nome: "Café da Tarde",
            tipo: "Café da Tarde",
            alimentos: [
                { descricao: "Iogurte Natural", quantidade: "1 copo", calorias: 150 },
                { descricao: "Granola", quantidade: "50g", calorias: 200 },
            ],
            totalCalorias: 350,
        },
        {
            nome: "Jantar",
            tipo: "Jantar",
            alimentos: [
                { descricao: "Sopa de Legumes", quantidade: "1 prato", calorias: 150 },
                { descricao: "Pão Francês", quantidade: "1 unidade", calorias: 120 },
            ],
            totalCalorias: 270,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="flex items-center justify-center pt-16 pb-16 h-[calc(100vh-80px)]"> 
                <div className="w-full max-w-5xl bg-white bg-opacity-80 rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800 pb-8">Minhas Refeições</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {refeicoes.map((refeicao, index) => (
                            <ItemRefeicao
                                key={index}
                                nome={refeicao.nome}
                                tipo={refeicao.tipo}
                                alimentos={refeicao.alimentos}
                                totalCalorias={refeicao.totalCalorias}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center items-center pt-3">
                        <h1 className="text-md text-gray-800">Seus dados não carregaram? Cadastre-os <a href="/Cadastro">aqui</a></h1>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RefeicaoPage;
