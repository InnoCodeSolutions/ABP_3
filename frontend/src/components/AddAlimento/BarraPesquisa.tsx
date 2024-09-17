import React from "react";

interface BarraPesquisaProps {
    onSearch: (query: string) => void;
    onCancel: () => void;
    onAdd: () => void;
}

const BarraPesq: React.FC<BarraPesquisaProps> = ({ onSearch, onCancel, onAdd }) => {
    const [query, setQuery] = React.useState("");

    const handleSearch = () => {
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
                    placeholder="Alimento"
                    className="bg-transparent text-white p-2 w-full focus:outline-none"
                />
            </div>

            <button onClick={onCancel} className="text-black font-semibold ml-4">
                Cancelar
            </button>

            <button onClick={onAdd} className="ml-2 p-2 bg-green-500 text-white rounded-lg">
                Adicionar
            </button>
        </div>
    );
};

export default BarraPesq;
