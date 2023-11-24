import { IUser } from '../../../../typings/user';

type CreateUserRequest = Omit<IUser, 'id, JWT'>;

 
export default CreateUserRequest;