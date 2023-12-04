import { IUser } from '../../../../typings/user';

type LoginUserResponse = Pick<IUser, 'id' |  'username' | 'JWT'>;

 
export default LoginUserResponse;