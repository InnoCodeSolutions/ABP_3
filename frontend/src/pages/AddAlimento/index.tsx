import React, { useState, useEffect } from "react";
import BarraPesq from "../../components/AddAlimento/BarraPesquisa";
import ItemAlimento from "../../components/AddAlimento/ItemAlimento"; // Importe o ItemAlimento
import ModalAlimentos from "../../components/AddAlimento/ModalAlimento";
import buscaAlimento from "../../services/Alimentos";
import { ItemAlimentoBackendProps } from "../../types";
import Header from "../../components/Header/Header";

const AddAlimentoPage: React.FC = () => {
    const [alimentosFiltrados, setAlimentosFiltrados] = useState<ItemAlimentoBackendProps[]>([]);
    const [allAlimentos, setAllAlimentos] = useState<ItemAlimentoBackendProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchAlimentos = async (query: string) => {
            try {
                const data = await buscaAlimento.buscaAlimento(query);
                if ('erro' in data) {
                    setError(data.erro);
                } else {
                    setAllAlimentos(data.spent); // ou qualquer estrutura que você espera
                    setAlimentosFiltrados(data.spent);
                }
            } catch (err) {
                console.error("Erro ao buscar alimentos:", err); // Log de erro geral
                setError('Erro ao buscar alimentos.');
            }
        };
    
        fetchAlimentos(query);
    }, [query]);

    const handleSearch = (query: string) => {
        if (!query) {
            setAlimentosFiltrados(allAlimentos);
        } else if (Array.isArray(allAlimentos)) {
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
            setAllAlimentos((prevAlimentos) => [...prevAlimentos, alimento]);
            setAlimentosFiltrados((prevAlimentos) => [...prevAlimentos, alimento]);
        } catch (err) {
            setError('Erro ao adicionar alimento.');
        }
        setIsModalOpen(false);
    };

    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            <Header/>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4 w-full max-w-lg mx-auto">
                <BarraPesq onSearch={handleSearch} onCancel={handleCancel} onAdd={handleAddAlimento} />
                {/* Renderize os itens filtrados diretamente */}
                <div className="w-full">
                    {alimentosFiltrados.map((item,index) => (
                        <ItemAlimento key={`${item.descricao}-${index}`} {...item} />
                    ))}
            </div>
            {isModalOpen && <ModalAlimentos onClose={handleCloseModal} onSave={handleSaveAlimento} />}
        </div>
        </div>
    );
};

export default AddAlimentoPage;
