import axiosInstance from '../config/axios';
import CreateProdutoRequest from '../requests/produto/create-produto-request';
import CreateProdutoResponse from '../responses/produto/create-produto-response';
import GetProdutoResponse from '../responses/produto/get-produto-response';
import GetProdutosResponse from '../responses/produto/get-produtos-response';
import UpdateProdutoRequest from '../requests/produto/update-produto-request';
import UpdateProdutoResponse from '../responses/produto/update-produto-response';

const USER_BASE_URL = '/produto';

const createProduto = async (request: CreateProdutoRequest) => axiosInstance.post<CreateProdutoResponse>(`${USER_BASE_URL}/`, request);

const getProduto = async (id: number) => axiosInstance.get<GetProdutoResponse>(`${USER_BASE_URL}/${id}/`);

const getProdutos = async () => axiosInstance.get<GetProdutosResponse>(`${USER_BASE_URL}/`);

const updateProduto = async (id: number, request: UpdateProdutoRequest) => axiosInstance.put<UpdateProdutoResponse>(`${USER_BASE_URL}/${id}/`, request);

const deleteProduto = async (id: number) => axiosInstance.delete<UpdateProdutoResponse>(`${USER_BASE_URL}/${id}/`);

export default {
    createProduto, 
    getProduto, 
    getProdutos, 
    updateProduto,
    deleteProduto
}