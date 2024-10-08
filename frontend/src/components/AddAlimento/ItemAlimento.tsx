import React from "react";
import { ItemAlimentoBackendProps } from "../../types";

interface ItemAlimentoProps {
    alimentos: ItemAlimentoBackendProps[];
}

const ItemAlimento: React.FC<ItemAlimentoProps> = ({ alimentos }) => {
    return (
        <div className="w-full">
            {/* Cabeçalho da planilha */}
            <div className="grid grid-cols-4 bg-zinc-800 text-zinc-200 font-bold py-2 text-center border border-black">
                <div>Descrição</div>
                <div>Carboidratos (g)</div>
                <div>Proteínas (g)</div>
                <div>Lipídeos (g)</div>
            </div>

            {/* Linhas dos alimentos */}
            {alimentos.map((alimento, index) => (
                <div
                    key={index}
                    className={`grid grid-cols-4 text-center py-2 border border-black ${
                        index % 2 === 0 ? 'bg-lime-50' : 'bg-lime-200'
                    }`}
                >
                    <div className='border-r-2 border-black'>{alimento.descricao}</div>
                    <div className='border-r-2 border-black'>{alimento.carboidrato}</div>
                    <div className='border-r-2 border-black'>{alimento.proteina}</div>
                    <div>{alimento.lipidios}</div>
                </div>
            ))}
        </div>
    );
};

export default ItemAlimento;
