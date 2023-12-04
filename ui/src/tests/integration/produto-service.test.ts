import UpdateProdutoResponse from "../../libs/api/responses/produto/update-produto-response";

describe('produto-service testes de integração', () => {
    let token : string | undefined;
    let userId : number | undefined;

    beforeAll(async () => {
        // Configuração: criar um usuário
        const createUserAttributes: CreateUserRequest = {
            username: 'testuser',
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

    it('Criar produto', async () => {
        const createProdutoAttributes: CreateProdutoRequest = {
            nome: 'test6',
            descricao: 'test',
            marca: `test`,
        };

        api.Produto.createProduto = jest.fn(async (request: CreateProdutoRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createProduto = await axiosInstance.post<CreateProdutoRequest>(`/produto/`, request);
                    return createProduto;
        });

        api.Produto.deleteProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteProduto = await axiosInstance.delete<DeleteProdutoResponse>(`/produto/${id}`);
                    return deleteProduto;
        });

        const createdProduto = await produtoService.createProduto(createProdutoAttributes);
        const deletedProduto = await produtoService.deleteProduto(createdProduto.id!);

        expect(createdProduto).toBeDefined();
        expect(deletedProduto).toBeDefined();
        expect(createdProduto.id).toBeDefined();
        expect(createdProduto.nome).toEqual(createProdutoAttributes.nome);
        expect(createdProduto.descricao).toEqual(createProdutoAttributes.descricao);
        expect(createdProduto.marca).toEqual(createProdutoAttributes.marca);
        

    });

    it('recuperar produto pelo id', async () => {
        const createProdutoAttributes: CreateProdutoRequest = {
            nome: 'test6',
            descricao: 'test',
            marca: `test`,
        };

        api.Produto.createProduto = jest.fn(async (request: CreateProdutoRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const createProduto = await axiosInstance.post<CreateProdutoRequest>(`/produto/`, request);
                    return createProduto;
        });

        api.Produto.deleteProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const deleteProduto = await axiosInstance.delete<DeleteProdutoResponse>(`/produto/${id}`);
                    return deleteProduto;
        });

        api.Produto.getProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const getProduto = await axiosInstance.get<GetProdutoResponse>(`/produto/${id}`);
            return getProduto;
        });

        const createdProduto = await produtoService.createProduto(createProdutoAttributes);
        const getProduto = await produtoService.getProduto(createdProduto.id!);
        const deletedProduto = await produtoService.deleteProduto(createdProduto.id!);

        expect(createdProduto).toBeDefined();
        expect(getProduto).toBeDefined();
        expect(deletedProduto).toBeDefined();
        expect(getProduto.id).toEqual(createdProduto.id);
        expect(getProduto.nome).toEqual(createProdutoAttributes.nome);
        expect(getProduto.descricao).toEqual(createProdutoAttributes.descricao);
        expect(getProduto.marca).toEqual(createProdutoAttributes.marca);

    });

    it('Recuperar todos os produtos', async () => {
        const createProdutoAttributes: CreateProdutoRequest = {
            nome: 'test6',
            descricao: 'test',
            marca: `test`,
        };

        api.Produto.createProduto = jest.fn(async (request: CreateProdutoRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const createProduto = await axiosInstance.post<CreateProdutoRequest>(`/produto/`, request);
            return createProduto;
        });

        api.Produto.deleteProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const deleteProduto = await axiosInstance.delete<DeleteProdutoResponse>(`/produto/${id}`);
            return deleteProduto;
        });

        api.Produto.getProdutos = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const getProdutos = await axiosInstance.get<GetProdutosResponse>(`/produto/`);
            return getProdutos;
        });

        const createdProduto = await produtoService.createProduto(createProdutoAttributes);
        const getProdutos = await produtoService.getProdutos();
        const deletedProduto = await produtoService.deleteProduto(createdProduto.id!);

        expect(createdProduto).toBeDefined();
        expect(getProdutos).toBeDefined();
        expect(deletedProduto).toBeDefined();
        expect(getProdutos.length).toBeGreaterThan(0);
        expect(getProdutos.filter((produto) => produto.id === createdProduto.id).length).toBe(1);
        expect(getProdutos.filter((produto) => produto.id === createdProduto.id)[0].nome).toBe(createProdutoAttributes.nome);
        expect(getProdutos.filter((produto) => produto.id === createdProduto.id)[0].descricao).toBe(createProdutoAttributes.descricao);
        expect(getProdutos.filter((produto) => produto.id === createdProduto.id)[0].marca).toBe(createProdutoAttributes.marca);
        
    });

    it('Atualizar produto', async () => {
        const createProdutoAttributes: CreateProdutoRequest = {
            nome: 'test6',
            descricao: 'test',
            marca: `test`,
        };

        const updateProdutoAttributes: UpdateProdutoRequest = {
            nome: 'test8',
            descricao: 'test8',
            marca: `test8`,
        };

        api.Produto.createProduto = jest.fn(async (request: CreateProdutoRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const createProduto = await axiosInstance.post<CreateProdutoRequest>(`/produto/`, request);
            return createProduto;
        });

        api.Produto.deleteProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const deleteProduto = await axiosInstance.delete<DeleteProdutoResponse>(`/produto/${id}`);
            return deleteProduto;
        });

        api.Produto.updateProduto = jest.fn(async (id:number, request: UpdateProdutoRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const updateProduto = await axiosInstance.put<UpdateProdutoResponse>(`/produto/${id}`, request);
            return updateProduto;
        });

        api.Produto.getProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const getProduto = await axiosInstance.get<GetProdutoResponse>(`/produto/${id}`);
            return getProduto;
        });

        const createdProduto = await produtoService.createProduto(createProdutoAttributes);
        const updatedProduto = await produtoService.updateProduto(createdProduto.id!, updateProdutoAttributes);
        const getProduto = await produtoService.getProduto(createdProduto.id!);
        const deletedProduto = await produtoService.deleteProduto(createdProduto.id!);

        expect(createdProduto).toBeDefined();
        expect(updatedProduto).toBeDefined();
        expect(getProduto).toBeDefined();
        expect(deletedProduto).toBeDefined();
        expect(updatedProduto.id).toEqual(createdProduto.id);
        expect(updatedProduto.nome).toEqual(updateProdutoAttributes.nome);
        expect(updatedProduto.descricao).toEqual(updateProdutoAttributes.descricao);
        expect(updatedProduto.marca).toEqual(updateProdutoAttributes.marca);
        expect(getProduto.id).toEqual(updatedProduto.id);
        expect(getProduto.nome).toEqual(updateProdutoAttributes.nome);
        expect(getProduto.descricao).toEqual(updateProdutoAttributes.descricao);
        expect(getProduto.marca).toEqual(updateProdutoAttributes.marca);
    });

    it('Apagar um produto', async () => {
        const createProdutoAttributes: CreateProdutoRequest = {
            nome: 'test6',
            descricao: 'test',
            marca: `test`,
        };

        api.Produto.createProduto = jest.fn(async (request: CreateProdutoRequest) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const createProduto = await axiosInstance.post<CreateProdutoRequest>(`/produto/`, request);
            return createProduto;
        });

        api.Produto.deleteProduto = jest.fn(async (id: number) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            });
            axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
            const deleteProduto = await axiosInstance.delete<DeleteProdutoResponse>(`/produto/${id}`);
            return deleteProduto;
        });

        const createdProduto = await produtoService.createProduto(createProdutoAttributes);
        const deletedProduto = await produtoService.deleteProduto(createdProduto.id!);

        expect(createdProduto).toBeDefined();
        expect(deletedProduto).toBeDefined();
        expect(deletedProduto.id).toEqual(createdProduto.id);
        expect(deletedProduto.nome).toEqual(createdProduto.nome);
        expect(deletedProduto.descricao).toEqual(createdProduto.descricao);
        expect(deletedProduto.marca).toEqual(createdProduto.marca);

    });
});

import produtoService from '../../services/produto-service';
import CreateProdutoRequest from '../../libs/api/requests/produto/create-produto-request';
import UpdateProdutoRequest from '../../libs/api/requests/produto/update-produto-request';import CreateUserRequest from '../../libs/api/requests/user/create-user-request';
import userService from '../../services/user-service';
import api from '../../libs/api';
import axios from 'axios';
import GetProdutosResponse from "../../libs/api/responses/produto/get-produtos-response";
import GetProdutoResponse from "../../libs/api/responses/produto/get-produto-response";import LogoutUserResponse from "../../libs/api/responses/user/logout-user-response";
import DeleteProdutoResponse from "../../libs/api/responses/produto/delete-produto-response";

