import { ReactNode } from "react";

export interface ItemAlimentoBackendProps {
    descricao: string;
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