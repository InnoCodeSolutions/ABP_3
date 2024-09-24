import React, { useState, useEffect } from "react";
import BarraPesq from "../../components/AddAlimento/BarraPesquisa";
import ListaAlimentos from "../../components/AddAlimento/ListaAlimentos";
import ModalAlimentos from "../../components/AddAlimento/ModalAlimento";
import buscaAlimento from "../../services/Alimentos";
import { ItemAlimentoBackendProps } from "../../types";

const AddAlimentoPage: React.FC = () => {
    const [alimentosFiltrados, setAlimentosFiltrados] = useState<ItemAlimentoBackendProps[]>([]);
    const [allAlimentos, setAllAlimentos] = useState<ItemAlimentoBackendProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlimentos = async () => {
            try {
                const data = await buscaAlimento.buscaAlimento();
                console.log("dados recebidos da service", data)
                if ('erro' in data) {
                    setError(data.erro);
                } else {
                    setAllAlimentos(data);
                    setAlimentosFiltrados(data);
                }
            } catch (err) {
                setError('Erro ao buscar alimentos.');
            }
        };

        fetchAlimentos();
    }, []);

    const handleSearch = (query: string) => {
        if (!query) {
            setAlimentosFiltrados(allAlimentos);
        } else {
            const filtrados = allAlimentos.filter((itemAlimento) =>
                itemAlimento.descricao.toLowerCase().includes(query.toLowerCase())
            );
            setAlimentosFiltrados(filtrados);
        }
    };

    const handleCancel = () => {
        setAlimentosFiltrados(allAlimentos);
    };

    const handleAddAlimento = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveAlimento = async (alimento: ItemAlimentoBackendProps) => {
        try {
            // Aqui você pode fazer uma chamada para a API para adicionar o alimento
            // await api.post('/adicionar', alimento);  // Ajuste conforme sua rota

            setAllAlimentos((prevAlimentos) => [...prevAlimentos, alimento]);
            setAlimentosFiltrados((prevAlimentos) => [...prevAlimentos, alimento]);
        } catch (err) {
            setError('Erro ao adicionar alimento.');
        }
        setIsModalOpen(false);
    };

    if (error) return <p>Erro: {error}</p>;

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
