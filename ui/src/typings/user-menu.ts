import { IUser } from './user';

export interface IUserMenu {
    anchorEl: HTMLElement | null;
    open: boolean;
    user: IUser | null;
    handleClose: () => void;
    handleLogout: () => void;
}

