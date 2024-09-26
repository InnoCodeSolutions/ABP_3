import React from "react";

interface ItemAlimentoProps {
    name: string;
    calorias: number;
    acucar: number;
    proteinas: number;
    carboidratos: number;
    gordura: number;
    quantidade: string;
}

const ItemAlimento: React.FC<ItemAlimentoProps> = ({ 
    name, 
    calorias, 
    acucar, 
    proteinas, 
    carboidratos, 
    gordura, 
    quantidade 
}) => {
    return (
        <div className="bg-green-500 border-2 border-green-700 rounded-lg p-4 mb-4 w-full">
            <h3 className="text-xl font-bold text-black">{name}</h3>
            <p className="text-black">{calorias} Kcal</p>
            <p className="text-black">Açúcar: {acucar}g</p>
            <p className="text-black">Proteínas: {proteinas}g</p>
            <p className="text-black">Carboidratos: {carboidratos}g</p>
            <p className="text-black">Gordura: {gordura}g</p>
            <p className="text-black">Quantidade: {quantidade}</p>
        </div>
    );
};

export default ItemAlimento;
