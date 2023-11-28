import { ICasa } from "./casa";

export interface IModalNovaCasaProps {
    open: boolean;
    onClose: () => void;
    setRetornoPaginaCasa: (casa:ICasa) => void;
};