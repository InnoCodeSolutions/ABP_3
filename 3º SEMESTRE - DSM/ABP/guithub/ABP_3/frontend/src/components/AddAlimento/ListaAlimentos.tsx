import React from "react";
import ItemAlimento from "./ItemAlimento";

interface ItemAlimento {
    id: number;
    name: string;
    calorias: number;
    acucar: number;
    proteinas: number;
    carboidratos: number;
    gordura: number;
    quantidade: string;
}

interface ListaAlimentosProps {
    itensAlimentos: ItemAlimento[]; 
}

const ListaAlimentos: React.FC<ListaAlimentosProps> = ({ itensAlimentos }) => {
    return (
        <div className="flex flex-col items-center w-full">
            {itensAlimentos.map((item) => (
                <ItemAlimento
                    key={item.id}
                    name={item.name}
                    calorias={item.calorias}
                    acucar={item.acucar}
                    proteinas={item.proteinas}
                    carboidratos={item.carboidratos}
                    gordura={item.gordura}
                    quantidade={item.quantidade}
                />
            ))}
        </div>
    );
};

export default ListaAlimentos;
