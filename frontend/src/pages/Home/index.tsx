import React from 'react';
import Header from '../../components/Header/Header';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Bem-vindo ao ramg.o</h1>
          <p className="text-lg text-gray-600">
            Esta é a página principal. Explore e aproveite!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
