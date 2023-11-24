import { IUser } from '../../../../typings/user';

type LoginUserRequest = Omit<IUser, 'id' | 'JWT'>;

 
export default LoginUserRequest;