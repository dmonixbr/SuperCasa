import { IUser } from "../../../../typings/user";

type UpdateUserResponse = Pick<IUser, 'username'>;

export default UpdateUserResponse;