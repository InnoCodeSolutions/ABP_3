import React, { useState, useEffect } from "react";
import BarraPesq from "../../components/AddAlimento/BarraPesquisa";
import ItemAlimento from "../../components/AddAlimento/ItemAlimento";
import ModalAlimentos from "../../components/AddAlimento/ModalAlimento";
import buscaAlimento from "../../services/Alimentos";
import { ItemAlimentoBackendProps } from "../../types";
import Header from "../../components/Header/Header";
import Pagination from '@mui/material/Pagination'; 
import { styled } from '@mui/material/styles'; 

const AddAlimentoPage: React.FC = () => {
    const [alimentosFiltrados, setAlimentosFiltrados] = useState<ItemAlimentoBackendProps[]>([]);
    const [allAlimentos, setAllAlimentos] = useState<ItemAlimentoBackendProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;

    useEffect(() => {
        const fetchAlimentos = async (query: string) => {
            try {
                const data = await buscaAlimento.buscaAlimento(query);
                if ('erro' in data) {
                    setError(data.erro);
                } else {
                    setAllAlimentos(data.spent);
                    setAlimentosFiltrados(data.spent);
                }
            } catch (err) {
                console.error("Erro ao buscar alimentos:", err);
                setError('Erro ao buscar alimentos.');
            }
        };

        fetchAlimentos(query);
    }, [query]);

    const handleSearch = (query: string) => {
        setQuery(query); // Atualiza a query de busca
        setCurrentPage(1); // Reseta para a primeira página ao pesquisar
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    // Atualiza os alimentos filtrados de acordo com a query
    useEffect(() => {
        if (query) {
            const filtrados = allAlimentos.filter((itemAlimento) =>
                itemAlimento.descricao.toLowerCase().includes(query.toLowerCase())
            );
            setAlimentosFiltrados(filtrados);
        } else {
            setAlimentosFiltrados(allAlimentos);
        }
    }, [query, allAlimentos]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const alimentosPaginados = alimentosFiltrados.slice(startIndex, endIndex);

    const handleCancel = () => {
        setQuery("");
        setCurrentPage(1);
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
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4 w-full max-w-6xl mx-auto">
                <BarraPesq onSearch={handleSearch} onCancel={handleCancel} onAdd={handleAddAlimento} />
                
                <ItemAlimento alimentos={alimentosPaginados} />

                <Pagination
                    count={Math.ceil(alimentosFiltrados.length / itemsPerPage)} // Atualiza de acordo com os alimentos filtrados
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        '& .Mui-selected': {
                            backgroundColor: 'black',
                            color: '#fff',
                        },
                        '& .Mui-selected:hover': {
                            backgroundColor: 'grey', // Cor para hover
                        }
                    }}
                />

                {isModalOpen && <ModalAlimentos onClose={handleCloseModal} onSave={handleSaveAlimento} />}
            </div>
        </div>
    );
};

export default AddAlimentoPage;
