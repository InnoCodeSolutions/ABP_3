import React, { useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header/Header';
import buscaAlimento from '../../services/Alimentos';
import { ItemAlimentoBackendProps } from '../../types';

type Food = {
  name: string;
  calories: number;
};

const NovaRefeicao: React.FC = () => {
  const [mealType, setMealType] = useState<string | null>(null);
  const [mealName, setMealName] = useState<string>('');
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foodOptions, setFoodOptions] = useState<Food[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]); // Novo estado para armazenar todos os alimentos

  const addFood = useCallback((food: Food) => {
    setSelectedFoods((prevFoods) => [...prevFoods, food]);
  }, []);

  const removeFood = (index: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
  };

  const totalCalories = selectedFoods.reduce((sum, food) => sum + food.calories, 0);

  const mealImages: { [key: string]: string } = {
    'Café da Manhã': '/img/cafeDaManha.png', 
    Almoço: '/img/almoco.png', 
    'Café da Tarde': '/img/cafeDaTarde.png', 
    Janta: '/img/janta.png', 
  };

  // Função para buscar todos os alimentos
  const fetchAllFoods = async () => {
    const result = await buscaAlimento.buscaAlimento(); // Busque todos os alimentos no início
    if ('erro' in result) {
      console.error(result.erro);
    } else if (Array.isArray(result.spent)) {
      const options = result.spent.map((item: ItemAlimentoBackendProps) => ({
        name: item.descricao || "", // Garante que seja uma string, mesmo se `descricao` for undefined
        calories: item.energia || 0, // Define um valor padrão se `energia` for undefined
      }));
      setAllFoods(options); // Armazena todos os alimentos
    } else {
      console.error("Erro: o resultado esperado não é um array");
    }
  };

  useEffect(() => {
    fetchAllFoods(); // Chama a função ao montar o componente
  }, []);

  // Efeito para filtrar alimentos com base na consulta de pesquisa
  useEffect(() => {
    if (searchQuery) {
      const filteredOptions = allFoods.filter(food =>
        food.name && food.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtro case-insensitive com verificação
      );
      setFoodOptions(filteredOptions);
    } else {
      setFoodOptions([]);
    }
  }, [searchQuery, allFoods]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        {!mealType ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Monte sua Refeição</h1>
            
            <input
              type="text"
              className="w-full max-w-md px-4 py-2 border rounded mb-6"
              placeholder="Digite o nome da refeição..."
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
            
            <p className="text-lg text-gray-600 mb-6">Escolha a refeição:</p>
            <div className="flex space-x-4">
              {['Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta'].map((meal) => (
                <button
                  key={meal}
                  className="flex flex-col items-center justify-center w-40 h-40 bg-blue-500 text-white rounded shadow-lg transition-transform transform hover:scale-105"
                  onClick={() => setMealType(meal)}
                >
                  <img src={mealImages[meal]} alt={meal} className="w-16 h-16 mb-2" />
                  <span className="text-lg font-semibold">{meal}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Selecione os alimentos para {mealType}</h2>
            <div className="mb-6">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Digite o nome do alimento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ul className="bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
                {foodOptions.map((food, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      addFood(food);
                      setSearchQuery(''); // Limpa a busca após a seleção
                      setFoodOptions([]); // Limpa as opções após a seleção
                    }}
                  >
                    {food.name} - {food.calories} kcal
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {selectedFoods.map((food, index) => (
                <div key={index} className="flex justify-between items-center mb-2 border-b pb-2">
                  <div className="flex justify-between w-full">
                    <span>{food.name}</span>
                    <span>{food.calories} kcal</span>
                  </div>
                  <button
                    className="ml-4 px-2 py-1 text-red-600 rounded"
                    onClick={() => removeFood(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setShowConfirmation(true)}
            >
              Finalizar Refeição
            </button>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Refeição Cadastrada!</h3>
              <p>Refeição: {mealName} - {mealType}</p>
              <p>Total de Calorias: {totalCalories} kcal</p>
              <p>Alimentos:</p>
              <ul className="mb-4">
                {selectedFoods.map((food, index) => (
                  <li key={index}>
                    {food.name} - {food.calories} kcal
                  </li>
                ))}
              </ul>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowConfirmation(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NovaRefeicao;
