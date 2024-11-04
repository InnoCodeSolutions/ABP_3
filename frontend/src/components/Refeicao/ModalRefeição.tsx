import React from "react";
import { Alimento } from "../../types";

interface ModalRefeicaoProps {
    tipo: string;
    alimentos: Alimento[];
    onClose: () => void;
}

const ModalRefeicao: React.FC<ModalRefeicaoProps> = ({ tipo, alimentos, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl h-3/4 overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
                <h2 className="font-bold text-xl mb-4">Detalhes da Refeição - {tipo}</h2>
                <ul className="mt-2">
                    {alimentos.map((alimento) => (
                        <li key={alimento.id} className="border-b py-2">
                            <span className="font-semibold text-gray-800">{alimento.descricao}</span>
                            <div className="text-gray-600">
                                <p>
                                    Lipídios: {alimento.lipidios.toFixed(2)}g |
                                    Proteína: {alimento.proteina.toFixed(2)}g |
                                    Carboidrato: {alimento.carboidrato.toFixed(2)}g |
                                    Total Calorias: {alimento.totalCalorias.toFixed(2)} kcal</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ModalRefeicao;
