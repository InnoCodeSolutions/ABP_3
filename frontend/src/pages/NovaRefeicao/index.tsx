import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import buscaAlimento from "../../services/Alimentos";
import refeicaoService from "../../services/Refeicao";
import { ItemAlimentoBackendProps } from "../../types";
import { Button } from "../../components/Button";

type Food = {
  name: string;
  calories: number;
};

interface FoodData {
  refeicao: string;
  descricao: string;
  nomePersonalizado?: string;
}

const NovaRefeicao: React.FC = () => {
  const navigate = useNavigate();

  const [mealType, setMealType] = useState<string | null>(null);
  const [mealName, setMealName] = useState<string>("");
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foodOptions, setFoodOptions] = useState<Food[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);

  const mealImages: { [key: string]: string } = {
    "Café da Manhã": "/img/cafeDaManha.png",
    Almoço: "/img/almoco.png",
    "Café da Tarde": "/img/cafeDaTarde.png",
    Janta: "/img/janta.png",
  };

  const addFood = useCallback((food: Food) => {
    setSelectedFoods((prevFoods) => [...prevFoods, food]);
  }, []);

  const removeFood = (index: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
  };

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + food.calories,
    0
  );

  const fetchAllFoods = async () => {
    const result = await buscaAlimento.buscaAlimento();
    if ("erro" in result) {
      console.error(result.erro);
    } else if (Array.isArray(result.spent)) {
      const options = result.spent.map((item: ItemAlimentoBackendProps) => ({
        name: item.descricao || "",
        calories: item.energia || 0,
      }));
      setAllFoods(options);
    } else {
      console.error("Erro: o resultado esperado não é um array");
    }
  };

  useEffect(() => {
    fetchAllFoods();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredOptions = allFoods.filter(
        (food) =>
          food.name &&
          food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFoodOptions(filteredOptions);
    } else {
      setFoodOptions([]);
    }
  }, [searchQuery, allFoods]);

  const handleFinalizeMeal = useCallback(async () => {
    try {
      for (const food of selectedFoods) {
        const foodData: FoodData = {
          descricao: food.name,
          nomePersonalizado: mealName,
          refeicao: mealType || "",
        };

        console.log("Dados enviados para a API", foodData);

        const response = await refeicaoService.adicionarRefeicao(foodData);

        if ("erro" in response) {
          console.error("Erro ao adicionar alimento:", response.erro);
        }
      }

      setShowConfirmation(true);
    } catch (error) {
      console.error("Erro ao finalizar refeição:", error);
    }
  }, [mealType, selectedFoods]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        {!mealType ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Monte sua Refeição
            </h1>

            <input
              type="text"
              className="w-full max-w-md px-4 py-2 border rounded mb-6"
              placeholder="Digite o nome da refeição..."
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />

            <p className="text-lg text-gray-600 mb-6">Escolha a refeição:</p>
            <div className="flex space-x-4">
              {["Café da Manhã", "Almoço", "Café da Tarde", "Janta"].map(
                (meal) => (
                  <button
                    key={meal}
                    className="flex flex-col items-center justify-center w-40 h-40 bg-blue-500 text-white rounded shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => {
                      setMealType(meal);
                    }}
                  >
                    <img
                      src={mealImages[meal]}
                      alt={meal}
                      className="w-16 h-16 mb-2"
                    />
                    <span className="text-lg font-semibold">{meal}</span>
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              1. Selecione os alimentos para {mealName}
            </h2>
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
                      setSearchQuery("");
                      setFoodOptions([]);
                    }}
                  >
                    {food.name} - {food.calories} kcal
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {selectedFoods.map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 border-b pb-2"
                >
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
              onClick={handleFinalizeMeal}
            >
              Finalizar Refeição
            </button>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
              {/* Botão de Fechar */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
              >
                ✕
              </button>

              {/* Título e Informações Gerais */}
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Refeição Cadastrada!
              </h3>

              <div className="mb-4">
                <p className="text-xl font-bold text-gray-900">
                  <span className="">{mealName}</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-sm text-gray-800">{mealType}</span>
                </p>
              </div>

              {/* Lista de Alimentos e Total de Calorias */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Alimentos:
                </h4>
                <ul className="divide-y divide-gray-200 text-gray-600 mb-4">
                  {selectedFoods.map((food, index) => (
                    <li key={index} className="py-2">
                      <span className="font-medium text-gray-800">
                        {food.name}
                      </span>{" "}
                      - {food.calories} kcal
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-gray-800">
                  Total de Calorias:{" "}
                  <span className="font-bold underline">
                    {selectedFoods
                      .reduce((acc, food) => acc + food.calories, 0)
                      .toFixed(2)}{" "}
                    kcal
                  </span>
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-center space-x-4">
                <Button variant='transparent'
                  onClick={() => navigate("/Home")}
                >
                  Voltar para Home
                </Button>
                <Button variant='done'
                  onClick={() => {
                    setShowConfirmation(false);
                    setMealType(null);
                    setMealName("");
                    setSelectedFoods([]);
                  }}
                >
                  Cadastrar Nova Refeição
                </Button>
                <Button variant='primary'
                  onClick={() => navigate("/refeicao")}
                >
                  Ver Refeições Cadastradas
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NovaRefeicao;
