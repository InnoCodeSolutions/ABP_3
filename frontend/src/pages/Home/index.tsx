import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import Header from '../../components/Header/Header';

interface UserData {
  nome: string;
  tmb: number;
  imc: number;
  peso: number;
  classificacao: string;
}

const getEmojiByClassificacao = (classificacao: string) => {
  switch (classificacao) {
    case 'Abaixo do Peso':
      return '😔';
    case 'Peso Ideal':
      return '✅';
    case 'Acima do Peso':
      return '⚠️';
    default:
      return '❓';
  }
};

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    nome: 'Mauro', // Exemplo, deve vir do backend
    tmb: 1800,     // Exemplo, taxa metabólica basal
    imc: 22.5,     // Exemplo, IMC
    peso: 70,      // Exemplo, peso em kg
    classificacao: 'Peso Ideal' // Exemplo, classificação com base no IMC
  });

  useEffect(() => {
    // Requisição ao backend para pegar os dados do usuário
    // Exemplo: fetch('API_URL').then(response => setUserData(response.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl bg-white bg-opacity-80 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Olá, {userData.nome}</h1>
            {/* Gráfico IMC tipo meia rosca */}
            <div className="w-1/3">
            <GaugeChart 
              id="imc-gauge"
              nrOfLevels={1}  // Ajusta o número de níveis para uma transição suave
              percent={userData.imc / 40}  // Supondo que o IMC máximo seja 40
              textColor="#000"
              colors={['#FF5F6D', '#FFC107', '#00FF00', '#FFC107', '#FF5F6D']}  // Vermelho -> Amarelo -> Verde -> Amarelo -> Vermelho
              arcWidth={0.3}  // Para manter o estilo meia rosca
              arcPadding={0.00}  // Pequeno espaço entre os arcos
              arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}  // Distribuição igual das cores
            />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Taxa Metabólica Basal</h2>
              <p className="text-lg text-gray-600">{userData.tmb} kcal/dia</p>
            </div>
            <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-gray-800">IMC</h2>
              <p className="text-lg text-gray-600">{userData.imc}</p>
            </div>
            <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Peso</h2>
              <p className="text-lg text-gray-600">{userData.peso} kg</p>
            </div>
            <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Classificação</h2>
              <p className="text-lg text-gray-600">
                {userData.classificacao} {getEmojiByClassificacao(userData.classificacao)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
