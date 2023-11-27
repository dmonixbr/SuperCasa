export interface IProdutoViewProps {
    produtoId: number | null;
    screenMode: 'view' | 'edit' | 'create';
    open: boolean;
    onClose: () => void;
};