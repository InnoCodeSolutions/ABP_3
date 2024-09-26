import React, { useState } from "react";

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

interface ModalProps {
    onClose: () => void;
    onSave: (alimento: ItemAlimento) => void;
}

const ModalAlimentos: React.FC<ModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState("");
    const [calorias, setCalorias] = useState("");
    const [acucar, setAcucar] = useState("");
    const [proteinas, setProteinas] = useState("");
    const [carboidratos, setCarboidratos] = useState("");
    const [gordura, setGordura] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //Converter para numeros
        const novoAlimento: ItemAlimento = {
            id: Date.now(), //Gerador de ID
            name,
            calorias: parseFloat(calorias),
            acucar: parseFloat(acucar),
            proteinas: parseFloat(proteinas),
            carboidratos: parseFloat(carboidratos),
            gordura: parseFloat(gordura),
            quantidade,
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
                        type="number"
                        value={calorias}
                        onChange={(e) => setCalorias(e.target.value)}
                        placeholder="Calorias"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={acucar}
                        onChange={(e) => setAcucar(e.target.value)}
                        placeholder="Açúcar"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={proteinas}
                        onChange={(e) => setProteinas(e.target.value)}
                        placeholder="Proteínas"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={carboidratos}
                        onChange={(e) => setCarboidratos(e.target.value)}
                        placeholder="Carboidratos"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="number"
                        value={gordura}
                        onChange={(e) => setGordura(e.target.value)}
                        placeholder="Gordura"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        placeholder="Quantidade"
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
