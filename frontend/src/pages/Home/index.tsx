import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    nome: '',
    tmb: 0,
    imc: 0,
    peso: 0,
    classificacao: ''
  });

  useEffect(() => {
    const mail = localStorage.getItem('mail');
    const token = localStorage.getItem('authToken');
    if (!token || !mail) {
      navigate('/login');
      return;
    }
  
    fetch('http://localhost:3001/perfil', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async response => {
        if (!response.ok) {
          const errorText = await response.text();  
          throw new Error(`Erro HTTP: ${response.status}, ${errorText}`);
        }
        return response.json();
      })
      .then(data => {
        // Filtra o usuário cujo mail corresponde ao mail no localStorage
        const user = data.find((u: any) => u.mail === mail);

        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        const peso = user.peso || 0;
        const altura = user.altura || 1;  // Evitar divisão por zero
        
        const imc = peso / ((altura / 100) * (altura / 100)); // Converte altura de cm para metros
        let classificacao = '';

        if (imc < 18.5) classificacao = 'Abaixo do Peso';
        else if (imc >= 18.5 && imc < 24.9) classificacao = 'Peso Ideal';
        else classificacao = 'Acima do Peso';

        setUserData({
          nome: user.nome || 'Usuário', // Lida com nome ausente
          tmb: user.tmb || 0,
          imc: imc,
          peso: peso,
          classificacao: classificacao
        });
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do perfil:', error.message);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl bg-white bg-opacity-80 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Olá, {userData.nome}</h1>
            <div className="w-1/3">
              <GaugeChart 
                id="imc-gauge"
                nrOfLevels={1}
                percent={userData.imc / 40} // Ajuste conforme sua escala desejada
                textColor="#000"
                colors={['#FF5F6D', '#FFC107', '#00FF00', '#FFC107', '#FF5F6D']}
                arcWidth={0.3}
                arcPadding={0.00}
                arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
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
              <p className="text-lg text-gray-600">{userData.imc.toFixed(2)}</p>
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
