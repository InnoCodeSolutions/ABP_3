
export interface ItemAlimentoBackendProps {
    preparacao: string;
    descricao: string;
    energia: number;
    carboidrato: number;
    proteina: number;
    lipidios: number;
    totalCalorias?:number;
}

export interface ErrorProps {
    erro: string;
}

export interface AlimentosApiResposta {
    pages: number;
    currentPage: number;
    count: number;
    average: string;
    spent: ItemAlimentoBackendProps[];
}

export interface RefeicoesApiResposta {
    alimentodate: string;
    refeicao: string;
    alimentos: Alimento[];
    totalCaloriasRefeicao: number;
    nomePersonalizado?: string;
}

export interface RefeicaoRequest {
    refeicao: string;
    descricao: string;
}

export interface Alimento {
    id: number; // ID do alimento
    descricao: string; // Descrição do alimento
    lipidios: number; // Quantidade de lipídios
    proteina: number; // Quantidade de proteína
    carboidrato: number; // Quantidade de carboidratos
    totalCalorias: number; // Total de calorias do alimento
    tipo: string; // Tipo do alimento
}

export interface ItemRefeicaoProps {
    tipo: string; // Tipo da refeição
    alimentos: Alimento[]; // Lista de alimentos
    totalCaloriasRefeicao: number; // Total de calorias da refeição
    nomePersonalizado?: string;
    alimentodate: string;
    
}
