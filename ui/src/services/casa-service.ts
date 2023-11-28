import React from 'react';
import api from '../libs/api';
import { toast } from 'react-toastify';
import CreateCasaRequest from '../libs/api/requests/casa/create-casa-request';
import { AxiosError, AxiosResponse } from 'axios';
import CreateCasaResponse from '../libs/api/responses/casa/create-casa-response';
import GetCasaResponse from '../libs/api/responses/casa/get-casa-response';
import GetCasasResponse from '../libs/api/responses/casa/get-casas-response';
import UpdateCasaRequest from '../libs/api/requests/casa/update-casa-request';
import UpdateCasaResponse from '../libs/api/responses/casa/update-casa-response';
import DeleteCasaResponse from '../libs/api/responses/casa/delete-casa-response';

const createCasa = async (createCasaAttributes: CreateCasaRequest) => {
    let createCasaResponse : AxiosResponse<CreateCasaResponse>;
    try {
        createCasaResponse = await api.Casa.createCasa(createCasaAttributes);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return createCasaResponse?.data;
};

const getCasa = async (id: number) => {
    let getCasaResponse : AxiosResponse<GetCasaResponse>;
    try {
        getCasaResponse = await api.Casa.getCasa(id);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return getCasaResponse?.data;
};

const getCasas = async () => {
    let getCasasResponse : AxiosResponse<GetCasasResponse>;
    try {
        getCasasResponse = await api.Casa.getCasas();
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return getCasasResponse?.data;
};

const updateCasa = async (id: number, updateCasaAttributes: UpdateCasaRequest) => {
    let updateCasaResponse : AxiosResponse<UpdateCasaResponse>;
    try {
        updateCasaResponse = await api.Casa.updateCasa(id, updateCasaAttributes);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }

    return updateCasaResponse?.data;
};

const deleteCasa = async (id: number) => {
    let deleteCasaResponse : AxiosResponse<DeleteCasaResponse>;
    try {
        deleteCasaResponse =  await api.Casa.deleteCasa(id);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw error as AxiosError;
    }
    return deleteCasaResponse?.data;
}

const casaService = {
    createCasa,
    getCasa,
    getCasas,
    updateCasa,
    deleteCasa
};

export default casaService;