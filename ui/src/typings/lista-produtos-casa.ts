import { IProdutoCasa } from "./produto";
import { ICasa }  from "./casa";

export interface IListaProdutosCasaProps {
    produtos: IProdutoCasa[];
    setCasa: (casa: ICasa) => void;
}