import React, { useState } from "react";
import { ItemAlimentoBackendProps } from "../../types";
import { Button } from "../Button";

interface ModalProps {
    onClose: () => void;
    onSave: (alimento: ItemAlimentoBackendProps) => void;
}

const ModalAlimentos: React.FC<ModalProps> = ({ onClose, onSave }) => {
    const [descricao, setDescricao] = useState("");
    const [preparacao, setPreparacao] = useState(""); 
    const [energia, setEnergia] = useState(""); 
    const [carboidrato, setCarboidrato] = useState("");
    const [proteina, setProteinaG] = useState("");
    const [lipidios, setLipideosG] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Converter para números e criar novo alimento
        const novoAlimento: ItemAlimentoBackendProps = {
            descricao,
            preparacao,
            energia: parseFloat(energia),
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
                <h2 className="text-2xl font-bold mb-4">Cadastrar alimento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        value={preparacao}
                        onChange={(e) => setPreparacao(e.target.value)}
                        placeholder="Preparação"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        value={energia}
                        onChange={(e) => setEnergia(e.target.value)}
                        placeholder="Energia (kcal)"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={carboidrato}
                        onChange={(e) => setCarboidrato(e.target.value)}
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
                        <Button
                            variant='secondary'
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant='primary'
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Adicionar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAlimentos;
