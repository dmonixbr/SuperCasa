import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';


export const MainListItems = () => {
  const navigate = useNavigate();
  
  const handlePaginaInicial = () => {
    navigate('/home');
  };
  const handleProdutos = () => {
    navigate('/produtos')
  };
  const handleCasas = () => {
    navigate('/casas')
  };

  return (
  <React.Fragment>
    <ListItemButton onClick={handlePaginaInicial}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Página Inicial" />
    </ListItemButton>
    <ListItemButton onClick={handleProdutos}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItemButton>
    <ListItemButton onClick={handleCasas}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Casas" />
    </ListItemButton>
  </React.Fragment>
  )
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Suas casas!
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Belo Horizonte" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Juiz de Fora" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Porto Alegre" />
    </ListItemButton>
  </React.Fragment>
);