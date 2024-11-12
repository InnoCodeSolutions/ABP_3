import React from "react";

interface Alimento {
    id: number; // ID do alimento
    descricao: string; // Descrição do alimento
    lipidios: number; // Quantidade de lipídios
    proteina: number; // Quantidade de proteína
    carboidrato: number; // Quantidade de carboidratos
    totalCalorias: number; // Total de calorias do alimento
    tipo: string; // Tipo do alimento
}

interface ItemRefeicaoProps {
    tipo: string; // Tipo da refeição
    alimentos: Alimento[]; // Lista de alimentos
    totalCaloriasRefeicao: number; // Total de calorias da refeição
}

const ItemRefeicao: React.FC<ItemRefeicaoProps> = ({ tipo, alimentos, totalCaloriasRefeicao }) => {
    // Agrupando alimentos por tipo
    const alimentosPorTipo = alimentos.reduce((acc: Record<string, Alimento[]>, alimento) => {
        acc[alimento.tipo] = acc[alimento.tipo] || [];
        acc[alimento.tipo].push(alimento);
        return acc;
    }, {});

    return (
        <div className="bg-white rounded-lg shadow p-2 mb-2"> {/* Ajuste no padding e margin */}
            <h2 className="font-bold text-xl mb-1"> - {tipo}</h2> {/* Exibe o tipo da refeição */}
            <h3 className="text-md text-gray-700 mb-2">
                Total de Calorias: <span className="font-semibold">{totalCaloriasRefeicao} kcal</span>
            </h3>
            {Object.entries(alimentosPorTipo).map(([tipoAlimento, alimentos]) => (
                <div key={tipoAlimento} className="mb-2">
                    <ul className="mt-2">
                        {alimentos.length > 0 ? (
                            alimentos.map((alimento) => (
                                <li key={alimento.id} className="border-b py-2 flex justify-between items-center"> {/* Adicione uma key única aqui */}
                                    <span className="font-semibold text-gray-800">{alimento.descricao}</span>
                                    <span className="text-gray-600">
                                        Lipídios: {alimento.lipidios}g | 
                                        Proteína: {alimento.proteina}g | 
                                        Carboidrato: {alimento.carboidrato}g | 
                                        Total Calorias: {alimento.totalCalorias} kcal
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="py-2 text-gray-600">Nenhum alimento encontrado.</li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ItemRefeicao;
