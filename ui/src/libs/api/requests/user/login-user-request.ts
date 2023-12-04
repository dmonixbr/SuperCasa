import { IUser } from '../../../../typings/user';

type LoginUserRequest = Omit<IUser, 'id' | 'JWT' | 'oldPassword'>;

 
export default LoginUserRequest;