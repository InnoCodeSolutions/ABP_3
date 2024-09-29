import { ReactNode } from "react";

export interface ItemAlimentoBackendProps {
    descricao: string;
    carboidrato_g: number;
    proteina_g: number;
    lipideos_g: number;
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