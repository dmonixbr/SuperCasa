import { AxiosError, AxiosResponse } from 'axios';
import api from '../libs/api';
import CreateUserRequest from '../libs/api/requests/user/create-user-request';
import CreateUserResponse from '../libs/api/responses/user/create-user-response';
import { toast } from 'react-toastify';
import LoginUserRequest from '../libs/api/requests/user/login-user-request';
import LoginUserResponse from '../libs/api/responses/user/login-user-response';
import UpdateUserRequest from '../libs/api/requests/user/update-user-request';
import UpdateUserResponse from '../libs/api/responses/user/update-user-response';

const createUser = async (createUserAttributes: CreateUserRequest): Promise<CreateUserResponse> => {
    let createUserResponse: AxiosResponse<CreateUserResponse>;
    try {
        createUserResponse = await api.User.createUser(createUserAttributes);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw (error as AxiosError);
    }

    return createUserResponse?.data;
}

const loginUser = async (loginUserAttributes: LoginUserRequest): Promise<LoginUserResponse> => {
    let loginUserResponse: AxiosResponse<LoginUserResponse>;
    try {
        loginUserResponse = await api.User.loginUser(loginUserAttributes);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw (error as AxiosError);
    }

    return loginUserResponse?.data;
}

const updateUser = async (updateUserAttributes: UpdateUserRequest): Promise<UpdateUserResponse> => {
    let updateUserResponse: AxiosResponse<UpdateUserResponse>;
    try {
        updateUserResponse = await api.User.updateUser(updateUserAttributes);
    } catch (error: any) {
        toast.error(error.response.data.error);
        throw (error as AxiosError);
    }

    return updateUserResponse?.data;
}

const userService = {
    createUser,
    loginUser,
    updateUser
}

export default userService;