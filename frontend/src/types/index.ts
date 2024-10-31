
export interface ItemAlimentoBackendProps {
    preparacao: string;
    descricao: string;
    energia: number;
    carboidrato: number;
    proteina: number;
    lipidios: number;
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
    refeicao: string;
    alimentos: ItemAlimentoBackendProps[];
    totalCaloriasRefeicao: number;
}

export interface RefeicaoRequest {
    refeicao: string;
    descricao: string;
}