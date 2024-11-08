import React, { useState } from "react";
import { Alimento, ItemRefeicaoProps } from "../../types";
import ModalRefeicao from "./ModalRefeição";
import { Button } from "../Button";

const ItemRefeicao: React.FC<ItemRefeicaoProps> = ({ alimentodate, nomePersonalizado, tipo, alimentos, totalCaloriasRefeicao }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    const alimentosPorTipo = alimentos.reduce((acc: Record<string, Alimento[]>, alimento) => {
        acc[alimento.tipo] = acc[alimento.tipo] || [];
        acc[alimento.tipo].push(alimento);
        return acc;
    }, {} as Record<string, Alimento[]>);

    return (
        <div className="bg-white rounded-lg shadow p-2 m-4">
            <h2 className="font-bold text-xl mb-1 flex justify-between">
                <div>{nomePersonalizado}</div> 
            </h2>
            <h3 className="text-md text-gray-700 mb-2 flex justify-between">
                <div>{tipo} | Total de Calorias: <span className="font-semibold">{totalCaloriasRefeicao.toFixed(2)} kcal</span></div>
                <div className="text-gray-700 ">Criado em: <span className="font-semibold">{alimentodate}</span></div>
            </h3>
            {Object.entries(alimentosPorTipo).map(([tipoAlimento, alimentos]) => (
                <div key={tipoAlimento} className="mb-2">
                    <ul className="mb-2">
                        {alimentos.slice(0, 3).map((alimento) => (
                            <li key={alimento.id} className="border-b py-2">
                                <span className="font-semibold text-gray-800">{alimento.descricao}</span>
                                <div className="text-gray-600">
                                    <p>
                                        Lipídios: {alimento.lipidios.toFixed(2)}g |
                                        Proteína: {alimento.proteina.toFixed(2)}g |
                                        Carboidrato: {alimento.carboidrato.toFixed(2)}g |
                                        Total Calorias: {alimento.totalCalorias.toFixed(2)} kcal
                                    </p>
                                </div>
                            </li>
                        ))}
                        {alimentos.length > 0 && (
                            <div className="pt-2 flex justify-end">
                                <Button onClick={toggleModal} variant="secondary" size="full" >
                                    Ver mais
                                </Button>
                            </div>
                        )}
                    </ul>
                </div>
            ))}

            {showModal && (
                <ModalRefeicao
                    tipo={tipo}
                    alimentos={alimentos}
                    onClose={toggleModal} 
                    totalCaloriasRefeicao={totalCaloriasRefeicao}
                    alimentodate={alimentodate}     
                    nomePersonalizado={nomePersonalizado}     
                 />
            )}
        </div>
    );
};

export default ItemRefeicao;
