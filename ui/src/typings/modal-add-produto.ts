import { ICasa } from "./casa";

export interface IModalAddProdutoProps{
    open: boolean;
    onClose: (open: boolean) => void;
    casaId: number | undefined;
    setCasa: (casa: ICasa) => void;
};