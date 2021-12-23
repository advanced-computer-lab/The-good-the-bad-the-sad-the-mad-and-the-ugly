import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import AppBar from "@mui/material/AppBar";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import {AccountCircle} from "@material-ui/icons";
import {Button, Menu, MenuItem} from "@material-ui/core";
import MyMenu from "./MyMenu";
import axios from "axios";

const options = ['Profile', 'Logout'];

const users = {
    admin: {
        options: {'Profile': '/profile', 'Log out': '/'},
    },
    guest: {
        options: {'Log in': '/login', 'Sign Up': '/signup'}
    },
    user: {
        options: {'Profile': '/profile', 'Log out': '/'},
    }
}
export default function Bar() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userType, setUserType] = useState('guest');

    const handleOpenUserMenu = (event) => {
        console.log(event);
        setAnchorElUser(event.currentTarget);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/login/authorize')
            .then(res => {
                if (res.data.success) {
                    if (res.data.isAdmin)
                        setUserType('admin');
                    else setUserType('user');
                } else setUserType('guest');
            })
    }, [])

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const guestUser = (
        <div>
            <Button variant="outlined">Login</Button>
            <Button variant="outlined">Sign Up</Button>
        </div>
    );

    const existingUser = (
        <div>
            <Button size="large" aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit" onClick={handleOpenUserMenu}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                </Typography>
                <AccountCircle/>
            </Button>
            <MyMenu options={options} anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser}/>
        </div>);

    return (
        <AppBar color='primary'>
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                </Typography>
                {existingUser}
            </Toolbar>
        </AppBar>
    );

}