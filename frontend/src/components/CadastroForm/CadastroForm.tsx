import React, { useState, ChangeEvent, FormEvent } from "react";
import InputCampo from "./InputCampo";
import SelectCampo from "./SelectCampo";
import Perfil from "../../services/Perfil"
import { Button } from "../Button";

const Formulario: React.FC = () => {
    // Função para pegar o token do localStorage
    const getTokenFromLocalStorage = () => {
        const token = localStorage.getItem('authToken');
        console.log("Token obtido do localStorage:", token); // Verifique se o token está correto
        return token;
    };

    // Função para pegar o mail do localStorage
    const getMailFromLocalStorage = () => {
        const mail = localStorage.getItem('mail');
        console.log("Mail obtido do localStorage:", mail); // Verifique se o mail está correto
        return mail;
    };

    const [formData, setFormData] = useState({
        genero: '',
        nome: '',
        peso: '',
        altura: '',
        idade: '',
        atividade: ''
    });

    const [errors, setErrors] = useState({
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

        // Limpa o erro quando o usuário começa a digitar
        setErrors({ ...errors, [name]: '' });
    };

    const [successMessage, setSuccessMessage] = useState<string>(''); // Aviso de perfil cadastrado com sucesso

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validação dos campos
        const newErrors: any = {};
        if (!formData.genero) newErrors.genero = "Por favor, selecione o seu gênero.";
        if (!formData.nome) newErrors.nome = "Por favor, insira o seu nome.";
        if (!formData.peso) newErrors.peso = "Por favor, insira o seu peso.";
        if (!formData.altura) newErrors.altura = "Por favor, insira a sua altura.";
        if (!formData.idade) newErrors.idade = "Por favor, insira a sua idade.";
        if (!formData.atividade) newErrors.atividade = "Por favor, selecione o nível de atividade física.";

        // Se houver erros, atualiza o estado de erros
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Obtém o mail do localStorage
        const mail = getMailFromLocalStorage();

        // Cria o payload que será enviado ao servidor
        const payload = {
            mail,  // Inclui o mail no payload
            genero: formData.genero,
            nome: formData.nome,
            peso: Number(formData.peso), // Certifique-se de que o peso é um número
            altura: Number(formData.altura), // Certifique-se de que a altura é um número
            idade: Number(formData.idade), // Certifique-se de que a idade é um número
            atividade: formData.atividade
        };

        console.log("Dados que estão sendo enviados:", payload); // Log dos dados que estão sendo enviados

        try {
            const response = await Perfil.fazerCadastro(payload);
            console.log("Dados enviados com sucesso", response);
            setSuccessMessage('Perfil cadastrado com sucesso!');
            setFormData({
                genero: '',
                nome: '',
                peso: '',
                altura: '',
                idade: '',
                atividade: ''
            });
        } catch (error: any) {
            // Detalhe adicional do erro
            console.error("Erro ao enviar dados:", error?.response?.data || error.message);
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
                {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}

                <InputCampo
                    label="Insira aqui o seu nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    type="text"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}

                <InputCampo
                    label="Insira aqui o seu peso (em kg)"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    placeholder="Peso"
                    type="number"
                />
                {errors.peso && <p className="text-red-500 text-sm mt-1">{errors.peso}</p>}

                <InputCampo
                    label="Insira aqui a sua altura (em centímetros)"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                    placeholder="Altura em centímetros"
                    type="number"
                />
                {errors.altura && <p className="text-red-500 text-sm mt-1">{errors.altura}</p>}

                <InputCampo
                    label="Insira aqui a sua idade em anos"
                    name="idade"
                    value={formData.idade}
                    onChange={handleChange}
                    placeholder="Idade"
                    type="number"
                />
                {errors.idade && <p className="text-red-500 text-sm mt-1">{errors.idade}</p>}

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
                {errors.atividade && <p className="text-red-500 text-sm mt-1">{errors.atividade}</p>}

                <Button
                    variant='secondary'
                    type="submit"
                    size='full'
                >
                    Enviar
                </Button>
                {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            </form>
        </div>
    );
};

export default Formulario;
