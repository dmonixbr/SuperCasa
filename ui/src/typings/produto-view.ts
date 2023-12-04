import { IProduto } from "./produto";

export interface IProdutoViewProps {
    produtoId: number | null;
    screenMode: 'view' | 'edit' | 'create';
    open: boolean;
    onClose: () => void;
    setRetornoProdutoModal: (produto:IProduto) => void;
    setScreenMode: (screenMode: 'view' | 'edit' | 'create') => void;
};