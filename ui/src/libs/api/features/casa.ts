import axiosInstance from '../config/axios';
import CreateCasaRequest from '../requests/casa/create-casa-request';
import CreateCasaResponse from '../responses/casa/create-casa-response';
import GetCasaResponse from '../responses/casa/get-casa-response';
import GetCasasResponse from '../responses/casa/get-casas-response';
import UpdateCasaRequest from '../requests/casa/update-casa-request';
import UpdateCasaResponse from '../responses/casa/update-casa-response';

const USER_BASE_URL = '/casa';

const createCasa = async (request: CreateCasaRequest) => axiosInstance.post<CreateCasaResponse>(`${USER_BASE_URL}/`, request);

const getCasa = async (id: number) => axiosInstance.get<GetCasaResponse>(`${USER_BASE_URL}/${id}/`);

const getCasas = async () => axiosInstance.get<GetCasasResponse>(`${USER_BASE_URL}/`);

const updateCasa = async (id: number, request: UpdateCasaRequest) => axiosInstance.put<UpdateCasaResponse>(`${USER_BASE_URL}/${id}/`, request);

const deleteCasa = async (id: number) => axiosInstance.delete<UpdateCasaResponse>(`${USER_BASE_URL}/${id}/`);

export default {
    createCasa, 
    getCasa, 
    getCasas, 
    updateCasa,
    deleteCasa
}