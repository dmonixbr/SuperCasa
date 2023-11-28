import "./App.css";
import { RouterProvider, useNavigate } from "react-router-dom";
import { router } from "./libs/router/router";
import React from "react";
import { IUser } from "./typings/user";
import { UserContext } from "./libs/context/user-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/user-service";

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);


  const handleValidateUser = (user: IUser) => {
    setUser(user);
    setIsSignedIn(true);
  }

  const handleLogin = (user: IUser) => {
    setUser(user);
    setIsSignedIn(true);
    localStorage.setItem("JWT", user.JWT!);
  };

  const handleLogout = async () => {
    try{
      setUser(null);
      setIsSignedIn(false);
      await userService.logoutUser();
      localStorage.removeItem("JWT");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, isSignedIn, handleLogout, handleValidateUser }}
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
