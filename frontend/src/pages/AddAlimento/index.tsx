import React, { useState } from "react";
import BarraPesq from "../../components/AddAlimento/BarraPesquisa";
import ListaAlimentos from "../../components/AddAlimento/ListaAlimentos";
import ModalAlimentos from "../../components/AddAlimento/ModalAlimento";

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

const mockAlimentos = [
    {
        id: 1,
        name: "Maçã",
        calorias: 52,
        acucar: 10,
        proteinas: 0.3,
        carboidratos: 14,
        gordura: 0.2,
        quantidade: "1 unidade",
    },
    {
        id: 2,
        name: "Banana",
        calorias: 89,
        acucar: 12,
        proteinas: 1.1,
        carboidratos: 23,
        gordura: 0.3,
        quantidade: "1 unidade",
    },
    {
        id: 3,
        name: "Frango grelhado",
        calorias: 165,
        acucar: 0,
        proteinas: 31,
        carboidratos: 0,
        gordura: 3.6,
        quantidade: "100g",
    },
    // Adicione mais alimentos conforme necessário
];

const AddAlimentoPage: React.FC = () => {
    const [alimentosFiltrados, setAlimentosFiltrados] = useState(mockAlimentos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoItemAlimento, setNovoItemAlimento] = useState(null);

    const handleSearch = (query: string) => {
        if (!query) {
            setAlimentosFiltrados(mockAlimentos);
        } else {
            const filtrados = mockAlimentos.filter((itemAlimento) =>
                itemAlimento.name.toLowerCase().includes(query.toLowerCase())
            );
            setAlimentosFiltrados(filtrados);
        }
    };

    const handleCancel = () => {
        setAlimentosFiltrados(mockAlimentos);
    };

    const handleAddAlimento = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveAlimento = (alimento: ItemAlimento) => {
        setAlimentosFiltrados((prevAlimentos) => [...prevAlimentos, alimento]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4 w-full max-w-lg mx-auto">
            <BarraPesq onSearch={handleSearch} onCancel={handleCancel} onAdd={handleAddAlimento} />
            <ListaAlimentos itensAlimentos={alimentosFiltrados} />
            <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full">
                CONCLUIR
            </button>

            {isModalOpen && <ModalAlimentos onClose={handleCloseModal} onSave={handleSaveAlimento} />}
        </div>
    );
};

export default AddAlimentoPage;
