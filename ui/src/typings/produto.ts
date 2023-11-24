export interface IProduto{
    id: number;
    nome: string;
    marca: string;
    descricao?: string;
}

export interface IProdutoCasa extends IProduto {
    quantidadeDesejada: number;
    quantidadeReal: number;
}