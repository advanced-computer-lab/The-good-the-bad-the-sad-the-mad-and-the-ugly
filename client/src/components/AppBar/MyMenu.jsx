import React, {useState} from 'react';
import {Menu, MenuItem} from "@material-ui/core";
import Typography from "@mui/material/Typography";


export default function MyMenu(props) {

    const options = props.options;
   const setAnchorElUser = props.setAnchorElUser;
  //   const [anchorElUser, setAnchorElUser] = React.useState(null);

    const anchorElUser = props.anchorElUser;

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        // <Menu sx={{mt: '45px'}} id="menu-appbar"
        //       anchorEl={anchorElUser}
        //       anchorOrigin={{
        //           vertical: 'top',
        //           horizontal: 'right',
        //       }}
        //       keepMounted
        //       transformOrigin={{
        //           vertical: 'top',
        //           horizontal: 'right',
        //       }}
        //       open={Boolean(anchorElUser)}
        //       onClose={handleCloseUserMenu}
        // >
        <Menu
            id="basic-menu"
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {options.map((option) => (
                <MenuItem key={option} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{option}</Typography>
                </MenuItem>
            ))}
        </Menu>
    )


}