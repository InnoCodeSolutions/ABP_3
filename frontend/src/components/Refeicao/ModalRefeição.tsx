import React from "react";
import { ItemRefeicaoProps } from "../../types";

interface ModalRefeicaoProps extends ItemRefeicaoProps {
    alimentodate: string;
    onClose: () => void;
}

const ModalRefeicao: React.FC<ModalRefeicaoProps> = ({ totalCaloriasRefeicao, nomePersonalizado, tipo, alimentodate, alimentos, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl h-3/4 overflow-y-auto relative">
                {/* Botão de Fechar */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold">✕</button>

                {/* Título e Detalhes da Refeição */}
                <div className="mb-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="font-bold text-2xl text-gray-800 mb-1">{nomePersonalizado}</h2>
                        </div>
                        <div>
                            <h2 className="font-semibold text-md text-gray-800 mb-1 flex">{totalCaloriasRefeicao.toFixed(2)} kcal</h2>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1"><strong>Tipo:</strong> {tipo}</p>
                    <p className="text-gray-600 text-sm"><strong>Criado em:</strong> {new Date(alimentodate).toLocaleDateString()}</p>
                </div>

                {/* Lista de Alimentos */}
                <div className="divide-y divide-gray-200">
                    {alimentos.map((alimento) => (
                        <div key={alimento.id} className="py-4">
                            <h3 className="font-semibold text-lg text-gray-700">{alimento.descricao}</h3>
                            <div className="text-gray-600 mt-1">
                                <p>Lipídios: {alimento.lipidios.toFixed(2)}g</p>
                                <p>Proteína: {alimento.proteina.toFixed(2)}g</p>
                                <p>Carboidrato: {alimento.carboidrato.toFixed(2)}g</p>
                                <p><strong>Total Calorias:</strong> {alimento.totalCalorias.toFixed(2)} kcal</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalRefeicao;
