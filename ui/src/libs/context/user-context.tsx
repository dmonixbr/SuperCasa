import React from 'react';
import { IUser } from '../../typings/user';
import { IUserContext } from '../../typings/user-context';

export const UserContext = React.createContext<IUserContext>({
    user: null,
    handleLogin: (user: IUser) => { },
    isSignedIn: false,
    handleLogout: () => { },
    handleValidateUser: (user: IUser) => {}
});