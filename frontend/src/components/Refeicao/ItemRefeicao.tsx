import React from "react";
import { Alimento, ItemRefeicaoProps } from "../../types";

const ItemRefeicao: React.FC<ItemRefeicaoProps> = ({ tipo, alimentos, totalCaloriasRefeicao }) => {
    const alimentosPorTipo = alimentos.reduce((acc: Record<string, Alimento[]>, alimento) => {
        acc[alimento.tipo] = acc[alimento.tipo] || [];
        acc[alimento.tipo].push(alimento);
        return acc;
    }, {});

    return (
        <div className="bg-white rounded-lg shadow p-2 mb-2">
            <h2 className="font-bold text-xl mb-1"> - {tipo}</h2>
            <h3 className="text-md text-gray-700 mb-2">
                Total de Calorias: <span className="font-semibold">{totalCaloriasRefeicao.toFixed(2)} kcal</span>
            </h3>
            {Object.entries(alimentosPorTipo).map(([tipoAlimento, alimentos]) => (
                <div key={tipoAlimento} className="mb-2">
                    <ul className="mt-2">
                        {alimentos.length > 0 ? (
                            alimentos.map((alimento) => (
                                <li key={alimento.id} className="border-b py-2 flex justify-between items-center">
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
