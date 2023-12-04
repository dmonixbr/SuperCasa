import { IUser } from '../../../../typings/user';

type CreateUserResponse = Omit<IUser,  'passwowrd' | 'JWT'>;

 
export default CreateUserResponse;