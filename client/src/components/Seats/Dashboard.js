import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>

        </Typography>
    );
}

const drawerWidth = 240;


const mdTheme = createTheme();

function DashboardContent() {
    let params = useParams();

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [depSeats, handleDepSeats] = useState({availableSeats: 0, maxSeats: 0, reservedSeats: []});
    const [returnSeats, handleReturnSeats] = useState({availableSeats: 0, maxSeats: 0, reservedSeats: []});
    const [isLoading, setLoading] = useState({dep: true, return: true});

    useEffect(() => {
        axios.get(`http://localhost:8000/flight/getFlightById/${params.departureFlightId}`)
            .then(
                res1 => {
                    axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${params.departureFlightId}`)
                        .then(
                            res2 => {
                                handleDepSeats(
                                    {
                                        availableSeats: res1.data.availableSeats[params.cabinClass],
                                        maxSeats: params.noOfSeats,
                                        reservedSeats: res2.data
                                    }
                                );
                                setLoading((prevState => {
                                    return {
                                        ...prevState,
                                        dep: false,
                                    }
                                }))
                            }
                        )

                    //console.log(depSeats);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            );

        axios.get(`http://localhost:8000/flight/getFlightById/${params.returnFlightId}`)
            .then(
                res1 => {
                    axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${params.returnFlightId}`)
                        .then(
                            res2 => {
                                handleReturnSeats(
                                    {
                                        availableSeats: res1.data.availableSeats[params.cabinClass],
                                        maxSeats: params.noOfSeats,
                                        reservedSeats: res2.data
                                    }
                                );
                                setLoading((prevState => {
                                    return {
                                        ...prevState,
                                        return: false,
                                    }
                                }))
                            }
                        )

                    //console.log(depSeats);
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            );
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box>
                <CssBaseline/>
                <div>
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position="static" sx={{flexGrow: 1, bgcolor: 'text.secondary'}}>
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    Airline System
                                </Typography>

                            </Toolbar>
                        </AppBar>
                    </Box>

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar/>
                        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={6} lg={7}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Chart title="Departure Ticket"/>
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={6} lg={5}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {isLoading.dep ? null :
                                            <Deposits title={"Departure Flight Seats"} seats={depSeats}/>}
                                    </Paper>
                                </Grid>
                                {/* Recent Orders */}
                                {/*<Grid item xs={12}>*/}
                                {/*  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
                                {/*    <Orders />*/}
                                {/*  </Paper>*/}
                                {/*</Grid>*/}
                            </Grid>

                            <Grid container spacing={3} style={{marginTop: 10}}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={7}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Chart title="Return Ticket"/>
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={5}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {isLoading.return ? null :
                                            <Deposits title={"Return Flight Seats"} seats={returnSeats}/>}
                                    </Paper>
                                </Grid>
                                {/* Recent Orders */}
                                {/*<Grid item xs={12}>*/}
                                {/*  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
                                {/*    <Orders />*/}
                                {/*  </Paper>*/}
                                {/*</Grid>*/}
                            </Grid>
                            <Copyright sx={{pt: 4}}/>
                        </Container>
                    </Box>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}
