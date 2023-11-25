import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./libs/router/router";
import React from "react";
import { IUser } from "./typings/user";
import { UserContext } from "./libs/context/user-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);

  const handleLogin = (user: IUser) => {
    setUser(user);
    setIsSignedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, isSignedIn, handleLogout }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </UserContext.Provider>
  );
}

export default App;
