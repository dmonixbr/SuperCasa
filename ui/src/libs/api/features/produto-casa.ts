import axiosInstance from '../config/axios';
import AdicionaProdutoCasaRequest from '../requests/produto-casa/adiciona-produto-casa-request';
import AdicionaProdutoCasaResponse from '../responses/produto-casa/adiciona-produto-casa-response';
import RemoveProdutoCasaRequest from '../requests/produto-casa/remove-produto-casa-request';
import RemoveProdutoCasaResponse from '../responses/produto-casa/remove-produto-casa-response';
import SomaQuantidadeProdutoCasaRequest from '../requests/produto-casa/soma-quantidade-produto-casa-request';
import SomaQuantidadeProdutoCasaResponse from '../responses/produto-casa/soma-quantidade-produto-casa-response';
import SubtraiQuantidadeProdutoCasaRequest from '../requests/produto-casa/subtrai-quantidade-produto-casa-request';
import SubtraiQuantidadeProdutoCasaResponse from '../responses/produto-casa/subtrai-quantidade-produto-casa-response';
import UpdateProdutoCasaRequest from '../requests/produto-casa/update-produto-casa-request';
import UpdateProdutoCasaResponse from '../responses/produto-casa/update-produto-casa-response';

const USER_BASE_URL = '/casa';

const adcionarProdutoCasa = async (idCasa: number, request: AdicionaProdutoCasaRequest) => axiosInstance.put<AdicionaProdutoCasaResponse>(`${USER_BASE_URL}/${idCasa}/adicionarProduto/`, request);

const removeProdutoCasa = async (idCasa: number, request: RemoveProdutoCasaRequest) => axiosInstance.put<RemoveProdutoCasaResponse>(`${USER_BASE_URL}/${idCasa}/removerProduto/`, request);

const somaQuantidadeProduto = async (idCasa: number, request: SomaQuantidadeProdutoCasaRequest) => axiosInstance.put<SomaQuantidadeProdutoCasaResponse>(`${USER_BASE_URL}/${idCasa}/somaQuantidadeProduto/`, request);

const subtractQuantidadeProduto = async (idCasa: number, request: SubtraiQuantidadeProdutoCasaRequest) => axiosInstance.put<SubtraiQuantidadeProdutoCasaResponse>(`${USER_BASE_URL}/${idCasa}/subtraiQuantidadeProduto/`, request);

const updateProdutoCasa = async (idCasa: number, request: UpdateProdutoCasaRequest) => axiosInstance.put<UpdateProdutoCasaResponse>(`${USER_BASE_URL}/${idCasa}/updateProduto/`, request);

export default {
    adcionarProdutoCasa, 
    removeProdutoCasa, 
    somaQuantidadeProduto, 
    subtractQuantidadeProduto,
    updateProdutoCasa
}