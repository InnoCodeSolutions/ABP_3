import React from "react";
import ItemAlimento from "./ItemAlimento";
import { ItemAlimentoBackendProps } from "../../types";

interface ListaAlimentosProps {
    itensAlimentos: ItemAlimentoBackendProps[]; 
}

const ListaAlimentos: React.FC<ListaAlimentosProps> = ({ itensAlimentos }) => {
    if (itensAlimentos.length === 0) return <p>Nenhum alimento encontrado.</p>;

    return (
        <div className="flex flex-col items-center w-full">
            {itensAlimentos.map((item, index) => (
                <ItemAlimento
                    key={index}
                    descricao={item.descricao}
                    carboidrato_g={item.carboidrato_g}
                    proteina_g={item.proteina_g}
                    lipideos_g={item.lipideos_g}
                />
            ))}
        </div>
    );
};

export default ListaAlimentos;
