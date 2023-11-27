export interface IProdutoViewProps {
    produtoId?: number;
    screenMode: 'view' | 'edit' | 'create';
    open: boolean;
    onClose: () => void;
};