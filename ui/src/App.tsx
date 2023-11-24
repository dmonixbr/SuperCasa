import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './libs/router/router';
import React from 'react';
import { IUser } from './typings/user';
import { UserContext } from './libs/context/user-context';

function App() {

  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);

  const handleLogin = (user: IUser) => {
    setUser(user);
    setIsSignedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <UserContext.Provider value={{ user, handleLogin, isSignedIn }}>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </UserContext.Provider>
  );
}

export default App;
