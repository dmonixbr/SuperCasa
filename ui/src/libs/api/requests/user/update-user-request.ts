import { IUser } from "../../../../typings/user";

type UpdateUserRequest = Omit<IUser, 'JWT'>;

export default UpdateUserRequest;