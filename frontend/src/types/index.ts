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