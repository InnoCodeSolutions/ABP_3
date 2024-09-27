import React from "react";
import { ItemAlimentoBackendProps } from "../../types";

const ItemAlimento: React.FC<ItemAlimentoBackendProps> = ({
    descricao,
    carboidrato_g,
    proteina_g,
    lipideos_g,
}) => {
    return (
        <div className="bg-green-500 border-2 border-green-700 rounded-lg p-4 mb-4 w-full">
            <h3 className="text-xl font-bold text-black">{descricao}</h3>
            <p className="text-black">Carboidratos: {carboidrato_g}g</p>
            <p className="text-black">Proteínas: {proteina_g}g</p>
            <p className="text-black">Lipídeos (gordura): {lipideos_g}g</p>
        </div>
    );
};

export default ItemAlimento;
