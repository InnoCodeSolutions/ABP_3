import React, { useState, ChangeEvent, FormEvent } from "react";
import InputCampo from "./InputCampo";
import SelectCampo from "./SelectCampo";

const Formulario: React.FC = () => {
    const [formData, setFormData] = useState({
        genero: '',
        nome: '',
        peso: '',
        altura: '',
        idade: '',
        atividade: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Dados preenchidos com sucesso", formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8 ">
            <form
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Dados Pessoais
                </h2>

                <SelectCampo
                    label="Selecione o seu gênero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    options={['Masculino', 'Feminino']}
                />

                <InputCampo
                    label="Insira aqui o seu nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    type="text"
                />

                <InputCampo
                    label="Insira aqui o seu peso (em kg)"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    placeholder="Peso"
                    type="number"
                />

                <InputCampo
                    label="Insira aqui a sua altura"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                    placeholder="Altura"
                    type="number"
                />

                <InputCampo
                    label="Insira aqui a sua idade em anos"
                    name="idade"
                    value={formData.idade}
                    onChange={handleChange}
                    placeholder="Idade"
                    type="number"
                />

                <SelectCampo
                    label="Selecione o seu nível de atividade física"
                    name="atividade"
                    value={formData.atividade}
                    onChange={handleChange}
                    options={['Sedentário - sem atividade', 'Baixa Atividade - 1 a 3 vezes na semana',
                        'Ativo - 3 a 5 vezes na semana', 'Alto - mais de 5 vezes na semana']}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Formulario;
