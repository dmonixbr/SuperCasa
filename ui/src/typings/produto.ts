export interface IProduto{
    id?: number;
    nome: string;
    marca: string;
    descricao?: string;
    deleted?: boolean;
}

export interface IProdutoCasa extends IProduto {
    quantidadeDesejada: number;
    quantidadeReal: number;
}