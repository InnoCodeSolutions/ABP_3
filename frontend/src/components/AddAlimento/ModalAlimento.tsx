import React, { useState } from "react";
import { ItemAlimentoBackendProps } from "../../types";

interface ModalProps {
    onClose: () => void;
    onSave: (alimento: ItemAlimentoBackendProps) => void;
}

const ModalAlimentos: React.FC<ModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [carboidrato, setCarboidratoG] = useState("");
    const [proteina, setProteinaG] = useState("");
    const [lipidios, setLipideosG] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Converter para números e criar novo alimento
        const novoAlimento: ItemAlimentoBackendProps = {
            descricao,
            carboidrato: parseFloat(carboidrato),
            proteina: parseFloat(proteina),
            lipidios: parseFloat(lipidios),
        };

        onSave(novoAlimento);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Adicionar Alimento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Categoria"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={carboidrato}
                        onChange={(e) => setCarboidratoG(e.target.value)}
                        placeholder="Carboidrato (g)"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={proteina}
                        onChange={(e) => setProteinaG(e.target.value)}
                        placeholder="Proteína (g)"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={lipidios}
                        onChange={(e) => setLipideosG(e.target.value)}
                        placeholder="Lipídios (g)"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAlimentos;
