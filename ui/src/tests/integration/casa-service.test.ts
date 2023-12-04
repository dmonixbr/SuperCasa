describe('casa-service testes de integração', () => {
    let token : string | undefined;
    let userId : number | undefined;

    beforeAll(async () => {
        // Configuração: criar um usuário
        const createUserAttributes: CreateUserRequest = {
            username: 'testuser2',
            password: 'testpassword',
        };

        const createdUser = await userService.createUser(createUserAttributes);

        // Login: fazer login como o usuário criado
        
        const login = await userService.loginUser(createUserAttributes);
        token = login.JWT;
        userId = login.id;
    });

    afterAll(async () => {
        // Limpeza: excluir o usuário
        api.User.logoutUser = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const logout = await axiosInstance.post<LogoutUserResponse>(`/user/logout`);
            return logout;
        });
        await userService.logoutUser();
        await userService.deleteUser(userId!);
    });

    it('Criar casa', async () => {
        const createCasaAttributes: CreateCasaRequest = {
            nome: 'test6',
            descricao: 'test',
        };

        api.Casa.createCasa = jest.fn(async (request: CreateCasaRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createCasa = await axiosInstance.post<CreateCasaResponse>(`/casa/`, request);
                return createCasa;
        });

        api.Casa.deleteCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteCasa = await axiosInstance.delete<DeleteCasaResponse>(`/casa/${id}`);
                return deleteCasa;
        });

        const createdCasa = await casaService.createCasa(createCasaAttributes);
        const deletedCasa = await casaService.deleteCasa(createdCasa.id!);

        expect(createdCasa).toBeDefined();
        expect(deletedCasa).toBeDefined();
        expect(createdCasa.id).toBeDefined();
        expect(createdCasa.nome).toEqual(createCasaAttributes.nome);
        expect(createdCasa.descricao).toEqual(createCasaAttributes.descricao);

    });

    it('recuperar casa pelo id', async () => {
        const createCasaAttributes: CreateCasaRequest = {
            nome: 'test6',
            descricao: 'test',
        };

        api.Casa.createCasa = jest.fn(async (request: CreateCasaRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createCasa = await axiosInstance.post<CreateCasaResponse>(`/casa/`, request);
                return createCasa;
        });

        api.Casa.deleteCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteCasa = await axiosInstance.delete<DeleteCasaResponse>(`/casa/${id}`);
                return deleteCasa;
        });

        api.Casa.getCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const getCasa = await axiosInstance.get<GetCasaResponse>(`/casa/${id}`);
            return getCasa;
        });

        const createdCasa = await casaService.createCasa(createCasaAttributes);
        const getCasa = await casaService.getCasa(createdCasa.id!);
        const deletedCasa = await casaService.deleteCasa(createdCasa.id!);

        expect(createdCasa).toBeDefined();
        expect(getCasa).toBeDefined();
        expect(deletedCasa).toBeDefined();
        expect(getCasa.id).toEqual(createdCasa.id);
        expect(getCasa.nome).toEqual(createCasaAttributes.nome);
        expect(getCasa.descricao).toEqual(createCasaAttributes.descricao);

    });

    it('Recuperar todos as casas', async () => {
        const createCasaAttributes: CreateCasaRequest = {
            nome: 'test6',
            descricao: 'test',
        };

        api.Casa.createCasa = jest.fn(async (request: CreateCasaRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createCasa = await axiosInstance.post<CreateCasaResponse>(`/casa/`, request);
                return createCasa;
        });

        api.Casa.deleteCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteCasa = await axiosInstance.delete<DeleteCasaResponse>(`/casa/${id}`);
                return deleteCasa;
        });

        api.Casa.getCasas = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const getCasas = await axiosInstance.get<GetCasasResponse>(`/casa/`);
            return getCasas;
        });

        const createdCasa = await casaService.createCasa(createCasaAttributes);
        const getCasas = await casaService.getCasas();
        const deletedCasa = await casaService.deleteCasa(createdCasa.id!);

        expect(createdCasa).toBeDefined();
        expect(getCasas).toBeDefined();
        expect(deletedCasa).toBeDefined();
        expect(getCasas.length).toBeGreaterThan(0);
        expect(getCasas.filter((casa) => casa.id === createdCasa.id).length).toBe(1);
        expect(getCasas.filter((casa) => casa.id === createdCasa.id)[0].nome).toBe(createCasaAttributes.nome);
        expect(getCasas.filter((casa) => casa.id === createdCasa.id)[0].descricao).toBe(createCasaAttributes.descricao);
        
    });

    it('Atualizar Casa', async () => {
        const createCasaAttributes: CreateCasaRequest = {
            nome: 'test6',
            descricao: 'test',
        };

        const updateCasaAttributes: UpdateCasaRequest = {
            nome: 'test8',
            descricao: 'test8',
        };

        api.Casa.createCasa = jest.fn(async (request: CreateCasaRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createCasa = await axiosInstance.post<CreateCasaResponse>(`/casa/`, request);
                return createCasa;
        });

        api.Casa.deleteCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteCasa = await axiosInstance.delete<DeleteCasaResponse>(`/casa/${id}`);
                return deleteCasa;
        });

        api.Casa.getCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const getCasa = await axiosInstance.get<GetCasaResponse>(`/casa/${id}`);
            return getCasa;
        });

        api.Casa.updateCasa = jest.fn(async (id: number, request: UpdateCasaRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const updateCasa = await axiosInstance.put<UpdateCasaResponse>(`/casa/${id}`, request);
            return updateCasa;
        });

        const createdCasa = await casaService.createCasa(createCasaAttributes);
        const updatedCasa = await casaService.updateCasa(createdCasa.id!, updateCasaAttributes);
        const getCasa = await casaService.getCasa(createdCasa.id!);
        const deletedCasa = await casaService.deleteCasa(createdCasa.id!);

        expect(createdCasa).toBeDefined();
        expect(updatedCasa).toBeDefined();
        expect(getCasa).toBeDefined();
        expect(deletedCasa).toBeDefined();
        expect(updatedCasa.id).toEqual(createdCasa.id);
        expect(updatedCasa.nome).toEqual(updateCasaAttributes.nome);
        expect(updatedCasa.descricao).toEqual(updateCasaAttributes.descricao);
        expect(getCasa.id).toEqual(updatedCasa.id);
        expect(getCasa.nome).toEqual(updateCasaAttributes.nome);
        expect(getCasa.descricao).toEqual(updateCasaAttributes.descricao);
    });

    it('Apagar uma casa', async () => {
        const createCasaAttributes: CreateCasaRequest = {
            nome: 'test6',
            descricao: 'test',
        };

        api.Casa.createCasa = jest.fn(async (request: CreateCasaRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createCasa = await axiosInstance.post<CreateCasaResponse>(`/casa/`, request);
                return createCasa;
        });

        api.Casa.deleteCasa = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteCasa = await axiosInstance.delete<DeleteCasaResponse>(`/casa/${id}`);
                return deleteCasa;
        });

        const createdCasa = await casaService.createCasa(createCasaAttributes);
        const deleteCasa = await casaService.deleteCasa(createdCasa.id!);

        expect(createdCasa).toBeDefined();
        expect(deleteCasa).toBeDefined();
        expect(deleteCasa.id).toEqual(createdCasa.id);
        expect(deleteCasa.nome).toEqual(createdCasa.nome);
        expect(deleteCasa.descricao).toEqual(createdCasa.descricao);

    });
});

import userService from '../../services/user-service';
import api from '../../libs/api';
import axios from 'axios';
import CreateCasaRequest from '../../libs/api/requests/casa/create-casa-request';import CreateCasaResponse from '../../libs/api/responses/casa/create-casa-response';
import DeleteCasaResponse from '../../libs/api/responses/casa/delete-casa-response';
import casaService from '../../services/casa-service';
import GetCasaResponse from '../../libs/api/responses/casa/get-casa-response';
import GetCasasResponse from '../../libs/api/responses/casa/get-casas-response';
import UpdateCasaResponse from '../../libs/api/responses/casa/update-casa-response';
import UpdateCasaRequest from '../../libs/api/requests/casa/update-casa-request';

