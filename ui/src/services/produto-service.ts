import { AxiosError, AxiosResponse } from 'axios';
import api from '../libs/api';
import CreateProdutoRequest from '../libs/api/requests/produto/create-produto-request';
import CreateProdutoResponse from '../libs/api/responses/produto/create-produto-response';
import GetProdutoResponse from '../libs/api/responses/produto/get-produto-response';
import GetProdutosResponse from '../libs/api/responses/produto/get-produtos-response';
import UpdateProdutoRequest from '../libs/api/requests/produto/update-produto-request';
import UpdateProdutoResponse from '../libs/api/responses/produto/update-produto-response';
import DeleteProdutoResponse from '../libs/api/responses/produto/delete-produto-response';
import { toast } from 'react-toastify';

const createProduto = async (createProdutoAttributes: CreateProdutoRequest) => {
    let createProdutoResponse : AxiosResponse<CreateProdutoResponse>;
    try {
        createProdutoResponse = await api.Produto.createProduto(createProdutoAttributes);
    } catch (error) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return createProdutoResponse?.data;
};

const getProduto = async (id: number) => {
    let getProdutoResponse : AxiosResponse<GetProdutoResponse>;
    try {
        getProdutoResponse = await api.Produto.getProduto(id);
    } catch (error) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return getProdutoResponse?.data;
};

const getProdutos = async () => {
    let getProdutosResponse : AxiosResponse<GetProdutosResponse>;
    try {
        getProdutosResponse = await api.Produto.getProdutos();
    } catch (error) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return getProdutosResponse?.data;
};

const updateProduto = async (id: number, updateProdutoAttributes: UpdateProdutoRequest) => {
    let updateProdutoResponse : AxiosResponse<UpdateProdutoResponse>;
    try {
        updateProdutoResponse = await api.Produto.updateProduto(id, updateProdutoAttributes);
    } catch (error) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return updateProdutoResponse?.data;
}

const deleteProduto = async (id: number) => {
    let deleteProdutoResponse : AxiosResponse<DeleteProdutoResponse>;
    try {
        deleteProdutoResponse = await api.Produto.deleteProduto(id);
    } catch (error) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return deleteProdutoResponse?.data;
}

const produtoService = {
    createProduto,
    getProduto,
    getProdutos,
    updateProduto,
    deleteProduto
};

export default produtoService;