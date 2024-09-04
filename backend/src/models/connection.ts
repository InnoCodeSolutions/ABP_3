import mongoose from 'mongoose';

// URI de conexão com o MongoDB
const uri: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bdabp3';

// Função para conectar ao MongoDB
export default async function connect(): Promise<void> {
  try {
    // Configura manipuladores de eventos para diferentes estados de conexão
    mongoose.connection.on('connected', () => console.log('Conectado ao MongoDB'));
    mongoose.connection.on('open', () => console.log('Conexão aberta'));
    mongoose.connection.on('disconnected', () => console.log('Desconectado do MongoDB'));
    mongoose.connection.on('reconnected', () => console.log('Reconectado ao MongoDB'));
    mongoose.connection.on('disconnecting', () => console.log('Desconectando do MongoDB'));
    mongoose.connection.on('close', () => console.log('Conexão com o MongoDB fechada'));

    // Conecta ao MongoDB
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao conectar ao MongoDB:', error.message);
    } else {
      console.error('Erro ao conectar ao MongoDB:', error);
    }
    process.exit(1);
  }

  // Gerencia o fechamento da conexão ao encerrar a aplicação
  process.on('SIGINT', async () => {
    try {
      console.log('Fechando conexão com o MongoDB...');
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao fechar a conexão com o MongoDB:', error.message);
      } else {
        console.error('Erro ao fechar a conexão com o MongoDB:', error);
      }
      process.exit(1);
    }
  });
}
