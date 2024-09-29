import React from 'react';
import { ItemAlimentoBackendProps } from "../../types";

interface ListaAlimentosProps {
    itensAlimentos: ItemAlimentoBackendProps[];
}

const ListaAlimentos: React.FC<ListaAlimentosProps> = ({ itensAlimentos }) => {
    if (!itensAlimentos || itensAlimentos.length === 0) {
        return <p>Nenhum alimento encontrado.</p>; 
    }

    return (
        <ul>
            {itensAlimentos.map((item, index) => (
                <li key={index}>
                    {item.descricao} - Carboidratos: {item.carboidrato_g}g, Proteínas: {item.proteina_g}g, Lipídios: {item.lipideos_g}g
                </li>
            ))}
        </ul>
    );
};

export default ListaAlimentos;
