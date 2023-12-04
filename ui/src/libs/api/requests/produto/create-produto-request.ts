import {IProduto} from '../../../../typings/produto';
type CreateProdutoRequest = Omit<IProduto, 'id'>;

 
export default CreateProdutoRequest;