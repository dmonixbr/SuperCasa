import { IProdutoCasa } from "./produto";

export interface ICasa{
    id: number;
    nome: string;
    descricao: string;
    produtos?: IProdutoCasa[];
}