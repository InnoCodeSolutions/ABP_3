import React, { useState, useCallback } from 'react';
import Header from '../../components/Header/Header';

type Food = {
  name: string;
  calories: number;
};

const NovaRefeicao: React.FC = () => {
  const [mealType, setMealType] = useState<string | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addFood = useCallback((food: Food) => {
    setSelectedFoods((prevFoods) => [...prevFoods, food]);
  }, []);

  const removeFood = (index: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
  };

  // Calcular total de calorias
  const totalCalories = selectedFoods.reduce((sum, food) => sum + food.calories, 0);

  const mealIcons = {
    'Café da Manhã': '☕',
    Almoço: '🍽️',
    'Café da Tarde': '🍵',
    Janta: '🍲',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        {!mealType ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Monte sua Refeição</h1>
            <p className="text-lg text-gray-600 mb-6">Escolha a refeição:</p>
            <div className="flex space-x-4">
              {['Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta'].map((meal) => (
                <button
                  key={meal}
                  className="flex flex-col items-center justify-center w-40 h-40 bg-blue-500 text-white rounded shadow-lg transition-transform transform hover:scale-105"
                  onClick={() => setMealType(meal)}
                >
                  <div className="text-5xl mb-2">{mealIcons[meal as keyof typeof mealIcons]}</div>
                  <span className="text-lg font-semibold">{meal}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Selecione os alimentos para {mealType}</h2>
            {/* Campo de busca de alimentos */}
            <div className="mb-6">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Digite o nome do alimento..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const foodName = e.currentTarget.value;
                    if (foodName) {
                      addFood({ name: foodName, calories: Math.floor(Math.random() * 500) });
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>

            {/* Lista de alimentos selecionados */}
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

            {/* Botão de confirmar refeição */}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setShowConfirmation(true)}
            >
              Finalizar Refeição
            </button>
          </div>
        )}

        {/* Modal de confirmação */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Refeição Cadastrada!</h3>
              <p>Refeição: {mealType}</p>
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
