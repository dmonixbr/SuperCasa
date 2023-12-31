import { IUser } from './user';

export interface IUserContext {
    user: IUser | null;
    handleLogin: (user: IUser) => void;
    isSignedIn: boolean;
    handleLogout: () => void;
    handleValidateUser: (user: IUser) => void;
}