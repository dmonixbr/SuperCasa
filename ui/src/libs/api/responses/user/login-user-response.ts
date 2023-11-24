import { IUser } from '../../../../typings/user';

type LoginUserResponse = Omit<IUser, 'id' |  'username' | 'passwowrd'>;

 
export default LoginUserResponse;