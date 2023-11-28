import axiosInstance from '../config/axios';
import CreateUserRequest from '../requests/user/create-user-request';
import CreateUserResponse from '../responses/user/create-user-response';
import LoginUserRequest from '../requests/user/login-user-request';
import LoginUserResponse from '../responses/user/login-user-response';
import LogoutUserResponse from '../responses/user/logout-user-response';
import UpdateUserRequest from '../requests/user/update-user-request';
import UpdateUserResponse from '../responses/user/update-user-response';
import ValidateUserResponse from '../responses/user/validate-user-response';

const USER_BASE_URL = '/user';

const createUser = async (request: CreateUserRequest) => axiosInstance.post<CreateUserResponse>(`${USER_BASE_URL}/`, request);

const loginUser = async (request: LoginUserRequest) => axiosInstance.post<LoginUserResponse>(`${USER_BASE_URL}/login`, request);

const logoutUser = async () => axiosInstance.post<LogoutUserResponse>(`${USER_BASE_URL}/logout`);

const updateUser = async (request: UpdateUserRequest) => axiosInstance.put<UpdateUserResponse>(`${USER_BASE_URL}/`, request);

const validateUser = async () => axiosInstance.post<ValidateUserResponse>(`${USER_BASE_URL}/validate`);

export default {createUser, loginUser, logoutUser, updateUser, validateUser};