import {IProduto} from '../../../../typings/produto';
type UpdateProdutoRequest = Omit<IProduto, 'id'>;

 
export default UpdateProdutoRequest;