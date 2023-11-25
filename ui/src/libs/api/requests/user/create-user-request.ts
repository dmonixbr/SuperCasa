import { IUser } from '../../../../typings/user';

type CreateUserRequest = Omit<IUser, 'id' | 'JWT' | 'oldPassword'>;

 
export default CreateUserRequest;