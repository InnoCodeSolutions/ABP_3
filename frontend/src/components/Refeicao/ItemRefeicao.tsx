import React, { useState } from "react";
import { Alimento, ItemRefeicaoProps } from "../../types";
import ModalRefeicao from "./ModalRefeição";
import { Button } from "../Button";

const ItemRefeicao: React.FC<ItemRefeicaoProps> = ({ alimentodate ,nomePersonalizado, tipo, alimentos, totalCaloriasRefeicao }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    const alimentosPorTipo = alimentos.reduce((acc: Record<string, Alimento[]>, alimento) => {
        acc[alimento.tipo] = acc[alimento.tipo] || [];
        acc[alimento.tipo].push(alimento);
        return acc;
    }, {} as Record<string, Alimento[]>);

    return (
        <div className="bg-white rounded-lg shadow p-2 mb-2">
            <h2 className="font-bold text-xl mb-1"> - {nomePersonalizado} - ({alimentodate})</h2> {/* Fallback aqui */}
            <h3 className="text-md text-gray-700 mb-2">
                {tipo} | Total de Calorias: <span className="font-semibold">{totalCaloriasRefeicao.toFixed(2)} kcal</span>
            </h3>
            {Object.entries(alimentosPorTipo).map(([tipoAlimento, alimentos]) => (
                <div key={tipoAlimento} className="mb-2">
                    <ul className="mt-2">
                        {alimentos.slice(0, 3).map((alimento) => (
                            <li key={alimento.id} className="border-b py-2">
                                <span className="font-semibold text-gray-800">{alimento.descricao}</span>
                                <div className="text-gray-600">
                                    <p>
                                        Lipídios: {alimento.lipidios.toFixed(2)}g |
                                        Proteína: {alimento.proteina.toFixed(2)}g |
                                        Carboidrato: {alimento.carboidrato.toFixed(2)}g |
                                        Total Calorias: {alimento.totalCalorias.toFixed(2)} kcal |
                                        Data Consumo : {alimentodate}
                                    </p>
                                </div>
                            </li>
                        ))}
                        {alimentos.length > 3 && (
                            <Button onClick={toggleModal} variant="secondary">
                                Ver mais
                            </Button>
                        )}
                    </ul>
                </div>
            ))}

            {showModal && (
                <ModalRefeicao
                    tipo={tipo}
                    alimentos={alimentos}
                    onClose={toggleModal}
                />
            )}
        </div>
    );
};

export default ItemRefeicao;
