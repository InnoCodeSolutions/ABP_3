import { ReactNode } from "react";

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
    alimentos(alimentos: any): unknown;
    pages: number;
    currentPage: number;
    count: number;
    average: string;
    spent: ItemAlimentoBackendProps[];
}