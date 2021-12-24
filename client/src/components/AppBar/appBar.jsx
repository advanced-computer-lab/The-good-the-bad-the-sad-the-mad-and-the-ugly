import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useEffect, useState} from "react";
import axios from "axios";
import FlightIcon from '@mui/icons-material/Flight';
import {ThemeProvider, createTheme, keyframes} from '@mui/material/styles';
import {green, purple} from "@material-ui/core/colors";
import Button from "@mui/material/Button";
import "./styles.css";


export default function MenuAppBar() {

    const rotating = {
        marginRight: '10px',
        transform: "rotate(90deg)",
        transition: 'transform 300ms ease'
    };

    const nonRotating = {
        marginRight: '10px',
        transform: "rotate(0deg)",
        transition: 'transform 300ms ease'
    };

    const enter = keyframes`
    0% { 
    transform: translate(0px, 0),
    opacity: 0%
    }
    100% { transform: translate(50px, 0),
    opacity: 100% }
    `;

    const exit = keyframes`
    0% { 
    transform: translate(0, 0),
    opacity: 100%
    }
    100% { transform: translate(-50px, 0),
    opacity: 0% }
    `;



    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userType, setUserType] = useState('guest');
    const[style, setStyle] = useState({
        marginRight: '10px'
    });

    const[enterStyle, setEntering] = useState("fade");






    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });




    useEffect(async () => {
        await axios.get('http://localhost:8000/login/authorize')
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    if (res.data.isAdmin)
                        setUserType('admin');
                    else setUserType('user');
                } else setUserType('guest');
            });
            // console.log(userType);
            // let right = setRight();
            // setRightComponent(right);
    }, []);





    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




    const guest = (<div>
        <Button href="/login" color="inherit">Log In</Button>
        <Button href="/signup" color="inherit">Sign Up</Button>
    </div>);
    const user = (<div>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
    </div>);

    const admin = (<div>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Admin Menu</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
    </div>);


    return (
        <Box sx={{ flexGrow: 1, mb: 5}}>

            <ThemeProvider theme={darkTheme}>

            <AppBar>
                <Toolbar>
                        <a href='/home' variant="text" color="primary">


                        <FlightIcon
                            onMouseEnter={() => {
                                setStyle(rotating);
                                setEntering("fadeIn");
                            }}
                            onMouseLeave={() => {
                                setStyle(nonRotating);
                                setEntering("fadeOut");
                            }}
                            style={style}
                        />
                        </a>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={enterStyle}>
                        Airline System
                    </Typography>
                    {(
                        userType ==='user'?user:userType==='admin'?admin:guest
                    )}
                </Toolbar>
            </AppBar>
            </ThemeProvider>

        </Box>
    );
}
