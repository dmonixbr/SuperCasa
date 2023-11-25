import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IUserMenu } from "../typings/user-menu";
import { Divider } from "@mui/material";

const UserMenu = (props: IUserMenu) => {
  const { anchorEl, open, user, handleClose, handleLogout } = props;

  const logout = () => {
    handleLogout();
    handleClose();
  }

  return (
    <>
      <Menu
        id="menu-user"
        aria-labelledby="menu do usuario"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>{user?.username}</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Trocar Senha</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
