import { IProdutoCasa } from "./produto";

export interface IListaAddProdutosCasaProps {
    casaId: number | undefined;
    setProdutosSelecionados: (produtosSelecionados: IProdutoCasa[]) => void;
}