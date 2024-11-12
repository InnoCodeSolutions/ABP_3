import React, { useState } from "react";
import { Button } from "../Button";

interface BarraPesquisaProps {
    onSearch: (query: string) => void;
    onCancel: () => void;
    onAdd: () => void;
}

const BarraPesq: React.FC<BarraPesquisaProps> = ({ onSearch, onCancel, onAdd }) => {
    const [query, setQuery] = useState(""); 

    // Função que será chamada quando o usuário pressionar "Enter"
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(query); // Executa a pesquisa quando "Enter" for pressionado
        }
    };

    // Função que será chamada ao clicar no botão "Pesquisar"
    const handleSearchClick = () => {
        onSearch(query);
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center border border-black rounded-full w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                    onKeyDown={handleKeyDown} 
                    placeholder="Alimento"
                    className="bg-transparent text-black p-2 w-full focus:outline-none"
                />
            </div>

            <Button 
                variant='pesquisar' 
                onClick={handleSearchClick} // Chama a função de pesquisa
                className="ml-2 pl-2 pr-2 bg-green-500 text-white rounded-lg" // Adiciona padding lateral
            >
                Pesquisar
            </Button>

        </div>
    );
};

export default BarraPesq;
