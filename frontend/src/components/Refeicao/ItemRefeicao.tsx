import React from "react";

interface Alimento {
    descricao: string;
    quantidade: string;
    calorias: number;
}

interface ItemRefeicaoProps {
    nome: string;
    tipo: string;
    alimentos: Alimento[];
    totalCalorias: number;
}

const ItemRefeicao: React.FC<ItemRefeicaoProps> = ({ nome, tipo, alimentos, totalCalorias }) => {
    return (
        <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{nome} ({tipo})</h2>
            <div className="mt-2">
                <h3 className="font-semibold text-gray-700">Alimentos:</h3>
                <ul className="list-disc pl-5">
                    {alimentos.map((alimento, index) => (
                        <li key={index} className="text-gray-600">
                            {alimento.descricao} - {alimento.quantidade} ({alimento.calorias} kcal)
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-lg text-gray-800 mt-2">Total de Calorias: {totalCalorias} kcal</p>
        </div>
    );
};

export default ItemRefeicao;
