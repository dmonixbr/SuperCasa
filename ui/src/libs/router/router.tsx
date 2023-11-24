import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import SignIn from '../../components/singin';
import Dashboard from '../../components/dashboard';
import Casas from '../../components/casas';
import Produtos from '../../components/produtos';

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: SignIn,
  },
  {
    id: "dashboard",
    path: "/home",
    Component: Dashboard
  },
  {
    id: "casas",
    path: "casas",
    Component: Casas,
  },
  {
    id: "produtos",
    path: "produtos",
    Component: Produtos,
  }
]);

