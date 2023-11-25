import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import SignIn from '../../components/singin';
import Dashboard from '../../components/dashboard';
import Casas from '../../components/casas';
import Produtos from '../../components/produtos';
import CriarConta from '../../components/criar-conta';
import TrocarSenha from '../../components/trocar-senha';

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: SignIn,
  },
  {
    id: "criar-conta",
    path: "/criar-conta",
    Component: CriarConta,
  },
  {
    id: 'trocar-senha',
    path: '/trocar-senha',
    Component: TrocarSenha,
  },
  {
    id: "dashboard",
    path: "/home",
    Component: Dashboard
  },
  {
    id: "casas",
    path: "/casas",
    Component: Casas,
  },
  {
    id: "produtos",
    path: "/produtos",
    Component: Produtos,
  }
]);

