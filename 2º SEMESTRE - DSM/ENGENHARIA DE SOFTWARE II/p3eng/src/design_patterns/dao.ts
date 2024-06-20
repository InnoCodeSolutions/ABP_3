import { Client } from 'pg';
import { MongoClient, Db } from 'mongodb';

interface UserDAO {
    listUser(users: string[]): Promise<string[]>;
}

class UserDAOPG implements UserDAO {
    // Configuração do PostgreSQL
    dbConfig: any = {
        user: 'postgres',
        host: 'localhost',
        database: 'uml',
        password: 'afo123381',
        port: 5432, // Porta configurada no seu sistema
    };

    async listUser(users: string[]): Promise<string[]> {
        const client = new Client(this.dbConfig);
        try {
            await client.connect();
            console.log('Conexão com PostgreSQL estabelecida.');

            // Executa uma consulta simples
            const result = await client.query('SELECT * FROM usuario');
            for (let i = 0; i < result.rows.length; ++i) {
                users.push(result.rows[i].nome);
            }
        } catch (err) {
            console.error('Erro de conexão com PostgreSQL:', err);
        } finally {
            client.end(); // Fecha a conexão com o PostgreSQL
        }
        return users;
    }
}

class UserDAOMongoDB implements UserDAO {
    // URL de conexão do MongoDB
    url: string = 'mongodb://localhost:27017';
    dbName: string = 'uml'; // Nome do banco de dados MongoDB

    async listUser(users: string[]): Promise<string[]> {
        let client: MongoClient | null = null;

        try {
            // Conecta ao servidor MongoDB
            client = await MongoClient.connect(this.url);
            console.log('Conexão com MongoDB estabelecida.');

            const db: Db = client.db(this.dbName);
            const collection = db.collection('users');

            // Lista todos os usuários na coleção
            const query = {}; // Critérios de consulta
            const options = {}; // Opções de consulta (projeção, ordenação, limite, etc.)
            const cursor = await collection.find(query, options);
            const documents = await cursor.toArray();
            for (let i = 0; i < documents.length; ++i) {
                users.push(documents[i].nome);
            }
        } catch (err) {
            console.error('Erro de conexão com MongoDB:', err);
        } finally {
            if (client) {
                await client.close(); // Fecha a conexão com MongoDB
            }
        }
        return users;
    }
}

export { UserDAO, UserDAOPG, UserDAOMongoDB };
