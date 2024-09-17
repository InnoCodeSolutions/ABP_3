import React, { useEffect, useState } from "react";
import buscaAlimento from "../../services/Alimentos";
import ItemAlimento from "./ItemAlimento";
import { ItemAlimentoBackendProps } from "../../types";

interface ListaAlimentosProps {
    itensAlimentos: ItemAlimentoBackendProps[]; // Use a interface correta aqui
}

const ListaAlimentos: React.FC<ListaAlimentosProps> = () => {
    const [itensAlimentos, setItensAlimentos] = useState<ItemAlimentoBackendProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlimentos = async () => {
            try {
                const data = await buscaAlimento.buscaAlimento();
                if ('erro' in data) {
                    setError(data.erro);
                } else {
                    setItensAlimentos(data);
                }
            } catch (err) {
                setError('Erro ao buscar alimentos.');
            }
        };

        fetchAlimentos();
    }, []);

    if (error) return <p>Erro: {error}</p>;

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
