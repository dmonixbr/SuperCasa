import { IUser } from '../../../../typings/user';

type CreateUserResponse = Omit<IUser, 'id, passwowrd, JWT'>;

 
export default CreateUserResponse;