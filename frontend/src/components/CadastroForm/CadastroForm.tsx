import React, { useState, ChangeEvent, FormEvent } from "react";
import InputCampo from "./InputCampo";
import SelectCampo from "./SelectCampo";
import { useAuth } from '../../context/AuthContext'; // Importe o hook useAuth para acessar o token

const Formulario: React.FC = () => {
    const { token } = useAuth(); // Obtenha o token do contexto de autenticação
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Cria o payload que será enviado ao servidor
        const payload = {
            genero: formData.genero,
            peso: Number(formData.peso), // Certifique-se de que o peso é um número
            altura: Number(formData.altura), // Certifique-se de que a altura é um número
            idade: Number(formData.idade), // Certifique-se de que a idade é um número
            atividade: formData.atividade
        };

        console.log("Dados que estão sendo enviados:", payload); // Log dos dados que estão sendo enviados

        try {
            const response = await fetch('http://localhost:3001/perfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Adicione o token no cabeçalho se necessário
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }

            const data = await response.json();
            console.log("Dados enviados com sucesso", data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
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
                    label="Insira aqui a sua altura (em metros)"
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
                    options={[
                        'Sedentário',
                        'Baixa Atividade - 1 a 3 vezes na semana',
                        'Ativo - 3 a 5 vezes na semana',
                        'Alto - mais de 5 vezes na semana'
                    ]}
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
