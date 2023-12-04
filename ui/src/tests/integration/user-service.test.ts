describe('user-service testes de integração', () => {
    it('Criar usuário', async () => {
        const createUserAttributes: CreateUserRequest = {
            username: 'test6',
            password: 'test',
        };

        const response = await userService.createUser(createUserAttributes);
        const response2 = await userService.deleteUser(response.id!);

        expect(response).toBeDefined();
        expect(response2).toBeDefined();
        expect(response.id).toBeDefined();
        expect(response.username).toEqual(createUserAttributes.username);
    });

    it('Login de usuário', async () => {
        const loginUserAttributes: CreateUserRequest = {
            username: 'test6',
            password: 'test',
        };

        const responseCreate = await userService.createUser(loginUserAttributes);
        const response = await userService.loginUser(loginUserAttributes);
        const response2 = await userService.deleteUser(responseCreate.id!);

        expect(response).toBeDefined();
        expect(response2).toBeDefined();
        expect(response.id).toBeDefined();
        expect(response.username).toEqual(loginUserAttributes.username);
        expect(response.JWT).toBeDefined();
    });

    it('Logout de usuário', async () => {
        const loginUserAttributes: CreateUserRequest = {
            username: 'test7',
            password: 'test',
        };

        const responseCreate = await userService.createUser(loginUserAttributes);
        const responseLogin = await userService.loginUser(loginUserAttributes);
        api.User.logoutUser = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${responseLogin.JWT}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
              const logout = await axiosInstance.post<LogoutUserResponse>(`/user/logout`);
                return logout;
        });

        const response = await userService.logoutUser();
        const response2 = await userService.deleteUser(responseCreate.id!);

        expect(response).toBeDefined();
        expect(response2).toBeDefined();
        expect(response.message).toEqual('Logout realizado com sucesso!');

    });

    it('Update usuario', async () => {
        const createUserAttributes: CreateUserRequest = {
            username: 'test8',
            password: 'test',
        };

        const responseCreate = await userService.createUser(createUserAttributes);
        const responseLogin = await userService.loginUser(createUserAttributes);

        const updateUserAttributesTest: UpdateUserRequest = {
            id: responseCreate.id,
            username: 'test8',
            oldPassword: 'test',
            password: 'newtest',
        };

        api.User.updateUser = jest.fn(async (updateUserAttributes) => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${responseLogin.JWT}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
                const updateUser = await axiosInstance.put<UpdateUserResponse>(`/user/`, updateUserAttributes);
                    return updateUser;
        });

        api.User.logoutUser = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${responseLogin.JWT}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
              const logout = await axiosInstance.post<LogoutUserResponse>(`/user/logout`);
                return logout;
        });

        const response = await userService.updateUser(updateUserAttributesTest);
        const responseLogout = await userService.logoutUser();
        const response2 = await userService.deleteUser(responseCreate.id!);

        expect(response).toBeDefined();
        expect(response2).toBeDefined();
        expect(responseLogout).toBeDefined();
        expect(response.username).toEqual(responseCreate.username);

    });

    it('Validar usuário', async () => {
        const createUserAttributes: CreateUserRequest = {
            username: 'test9',
            password: 'test',
        };
        const responseCreate = await userService.createUser(createUserAttributes);
        const responseLogin = await userService.loginUser(createUserAttributes);

        api.User.validateUser = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${responseLogin.JWT}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
              const validate = await axiosInstance.post<ValidateUserResponse>(`/user/validate`);
                return validate;
        });

        api.User.logoutUser = jest.fn(async () => {
            const axiosInstance = axios.create({
                baseURL: `http://127.0.0.1:5000/`,
                headers: {
                  Authorization: `Bearer ${responseLogin.JWT}`,
                },
              });
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
              const logout = await axiosInstance.post<LogoutUserResponse>(`/user/logout`);
                return logout;
        });

        const response = await userService.validateUser();
        const responseLogout = await userService.logoutUser();
        const response2 = await userService.deleteUser(responseCreate.id!);

        expect(response).toBeDefined();
        expect(responseLogout).toBeDefined();
        expect(response2).toBeDefined();
        expect(response.username).toEqual(responseCreate.username);
        expect(response.id).toEqual(responseCreate.id);


    });

    it('Apagar usuário', async () => {
        const createUserAttributes: CreateUserRequest = {
            username: 'test10',
            password: 'test',
        };
        const responseCreate = await userService.createUser(createUserAttributes);

        const response = await userService.deleteUser(responseCreate.id!);

        expect(response).toBeDefined();
        expect(response.sucesso).toEqual(`Usuário ${responseCreate.username} deletado com sucesso!`);

    });
});
import userService from '../../services/user-service';
import CreateUserRequest from '../../libs/api/requests/user/create-user-request';
import UpdateUserRequest from "../../libs/api/requests/user/update-user-request";
import api from '../../libs/api';
import axios from 'axios';
import LogoutUserResponse from '../../libs/api/responses/user/logout-user-response';
import ValidateUserResponse from "../../libs/api/responses/user/validate-user-response";
import UpdateUserResponse from "../../libs/api/responses/user/update-user-response";

