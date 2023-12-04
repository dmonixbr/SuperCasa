import { IUser } from "../../../../typings/user";

type ValidateUserResponse = Pick<IUser, 'id' | 'username'>

export default ValidateUserResponse;