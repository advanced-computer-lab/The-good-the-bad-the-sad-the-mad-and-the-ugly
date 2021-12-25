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
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";
import {Container, CssBaseline} from "@material-ui/core";

export default function MenuAppBar() {

    const navigate = useNavigate();

    async function handleSubmit(link) {
        handleClose();
        navigate(link);
    }

    // const navigate = useNavigate();

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
        transform: translate(0px, 0);
        opacity: 0%
      }
      100% {
        transform: translate(50px, 0);
        opacity: 100%
      }
    `;

    const exit = keyframes`
      0% {
        transform: translate(0, 0);
        opacity: 100%
      }
      100% {
        transform: translate(-50px, 0);
        opacity: 0%
      }
    `;


    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userType, setUserType] = useState(null);
    const [style, setStyle] = useState({
        marginRight: '10px'
    });
    const [hasIncompleteReservation, setHasIncompleteReservation] = useState(false);
    const [reservationId, setReservationId] = useState(null);

    const [enterStyle, setEntering] = useState("fade");
    const [clicked, setClicked] = useState(1);


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
                if (res.data.success) {
                    if (res.data.isAdmin)
                        setUserType('admin');
                    else setUserType('user');
                } else setUserType('guest');

                axios.get('http://localhost:8000/reservation/getReservationBySessionId')
                    .then(
                        res1 => {
                            if (res1.data.length > 0) {
                                setHasIncompleteReservation(true);
                                setReservationId(res1.data);
                            }
                        }
                    )

            });

    }, [clicked]);


    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logOut = async () => {
        handleClose();
        setClicked(clicked + 1);
        await axios.post('http://localhost:8000/logout')
            .then(res => {
                console.log(res.data);
                navigate('/home');
            });
    }
    const handleClose = () => {
        setAnchorEl(null);
    };


    const guest = (<div>
        <Button onClick={()=> handleSubmit('/login')} color="inherit">Log In</Button>
        <Button onClick={()=> handleSubmit('/signup')} color="inherit">Sign Up</Button>
    </div>);


    const user = (<div>
        {hasIncompleteReservation ?
            <Button
                color="secondary"
                href={`/selectSeats/${reservationId}`}
            >
                Complete your booking
            </Button> : null
        }
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle/>
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
            <MenuItem onClick={() => handleSubmit('/profile')}>
                Profile
            </MenuItem>
            <MenuItem onClick={() => handleSubmit("/showUserReservations")}>
                My Reservations
            </MenuItem>
            <MenuItem onClick={logOut}>
                Log Out
            </MenuItem>
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
            <AccountCircle/>
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
            <MenuItem onClick={() => handleSubmit('/profile')}>
                Profile
            </MenuItem>
            <MenuItem onClick={() => handleSubmit("/createFlight")}>
                Create Flight
            </MenuItem>
            <MenuItem onClick={() => handleSubmit("/showFlights")}>
                Search Flights
            </MenuItem>
            <MenuItem onClick={() => handleSubmit("/showAllFlights")}>
                Show All Flights
            </MenuItem>
            <MenuItem onClick={logOut}>
                Log Out
            </MenuItem>
        </Menu>
    </div>);


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Box sx={{flexGrow: 1, mb: 5}}>


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
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}} className={enterStyle}>
                            Airline System
                        </Typography>
                        {(
                            userType === 'user' ? user : userType === 'admin' ? admin : userType === 'guest' ? guest : ""
                        )}
                    </Toolbar>
                </AppBar>


            </Box>
        </ThemeProvider>
    );
}
