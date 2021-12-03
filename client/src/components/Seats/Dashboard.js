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
import {format, formatISO, parseISO} from "date-fns";
import moment from "moment";

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
    const [isSeatsLoading, setSeatsLoading] = useState({dep: true, return: true});
    const [isFlightsLoading, setFlightsLoading] = useState({dep: true, return: true});
    const [flightsData, setFlightsData] = useState({
        dep: {
            fromCity: '',
            fromAirport: '',
            toCity: '',
            toAirport: '',
            departureTerminal: '',
            arrivalTerminal: '',
            departureTime: '',
            arrivalTime: '',
            flightPrice: {},
            baggageAllowance: '',
            flightNumber: ''
        },
        return: {
            fromCity: '',
            fromAirport: '',
            toCity: '',
            toAirport: '',
            departureTerminal: '',
            arrivalTerminal: '',
            departureTime: '',
            arrivalTime: '',
            flightPrice: {},
            baggageAllowance: '',
            flightNumber: ''
        }
    });
    const [chosenSeats, setChosenSeats] = useState({
        dep: [],
        return: [],
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/flight/getFlightById/${params.departureFlightId}`)
            .then(
                res1 => {
                    axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${params.departureFlightId}/${params.cabinClass}`)
                        .then(
                            res2 => {
                                handleDepSeats(
                                    {
                                        availableSeats: res1.data.availableSeats[params.cabinClass],
                                        maxSeats: parseInt(params.noOfAdults) + parseInt(params.noOfChildren),
                                        reservedSeats: res2.data
                                    }
                                );
                                setSeatsLoading((prevState => {
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
                    axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${params.returnFlightId}/${params.cabinClass}`)
                        .then(
                            res2 => {
                                handleReturnSeats(
                                    {
                                        availableSeats: res1.data.availableSeats[params.cabinClass],
                                        maxSeats: parseInt(params.noOfAdults) + parseInt(params.noOfChildren),
                                        reservedSeats: res2.data
                                    }
                                );
                                setSeatsLoading((prevState => {
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

        axios.get(`http://localhost:8000/flight/getFlightById/${params.departureFlightId}`)
            .then(res => {
                setFlightsData((prevState => {
                    return {
                        ...prevState,
                        dep: {
                            fromCity: res.data.from,
                            fromAirport: res.data.departureAirport,
                            toCity: res.data.to,
                            toAirport: res.data.arrivalAirport,
                            departureTerminal: res.data.departureTerminal,
                            arrivalTerminal: res.data.arrivalTerminal,
                            departureTime: res.data.departure,
                            arrivalTime: res.data.arrival,
                            flightPrice: res.data.price,
                            baggageAllowance: res.data.baggageAllowance,
                            flightNumber: res.data.flightNumber
                        }
                    }
                }))

                setFlightsLoading((prevState => {
                    return {
                        ...prevState,
                        dep: false,
                    }
                }));

                // console.log(flightsData.dep.flightPrice[params.cabinClass]['adult']);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`http://localhost:8000/flight/getFlightById/${params.returnFlightId}`)
            .then(res => {
                setFlightsData((prevState => {
                    return {
                        ...prevState,
                        return: {
                            fromCity: res.data.from,
                            fromAirport: res.data.departureAirport,
                            toCity: res.data.to,
                            toAirport: res.data.arrivalAirport,
                            departureTerminal: res.data.departureTerminal,
                            arrivalTerminal: res.data.arrivalTerminal,
                            departureTime: res.data.departure,
                            arrivalTime: res.data.arrival,
                            flightPrice: res.data.price,
                            baggageAllowance: res.data.baggageAllowance,
                            flightNumber: res.data.flightNumber
                        }
                    }
                }))
                // console.log(flightsData.return);
                setFlightsLoading((prevState => {
                    return {
                        ...prevState,
                        return: false,
                    }
                }));

            })
            .catch(err => {
                console.log(err);
            });
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
                                        {isFlightsLoading.dep ? null : <Chart
                                            title="Departure Ticket"
                                            fromCity={flightsData.dep.fromCity}
                                            fromAirport={flightsData.dep.fromAirport}
                                            toCity={flightsData.dep.toCity}
                                            toAirport={flightsData.dep.toAirport}
                                            departureTerminal={flightsData.dep.departureTerminal}
                                            arrivalTerminal={flightsData.dep.arrivalTerminal}
                                            departureTime={moment(flightsData.dep.departureTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, do YYYY')}
                                            arrivalTime={moment(flightsData.dep.arrivalTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, do YYYY')}
                                            cabinClass={params.cabinClass}
                                            noOfAdults={params.noOfAdults}
                                            noOfChildren={params.noOfChildren}
                                            reservedSeats={chosenSeats.dep.reduce(((previousValue, currentValue, currentIndex) => {return currentIndex !== chosenSeats.dep.length - 1 ? `${previousValue} ${currentValue},` : `${previousValue} ${currentValue}`}), '')}
                                            flightNumber={flightsData.dep.flightNumber}
                                            flightPrice={parseInt(flightsData.dep.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)
                                            + parseInt(flightsData.dep.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)}
                                            baggageAllowance={flightsData.dep.baggageAllowance}
                                        />}
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
                                        {isSeatsLoading.dep ? null :
                                            <Deposits title={"Departure Flight Seats"} seats={depSeats} flightType={'dep'} chosenSeatsCallback={setChosenSeats}/>}
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
                                <Grid item xs={12} md={6} lg={7}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {isFlightsLoading.return ? null :
                                            <Chart title="Return Ticket"
                                                   fromCity={flightsData.return.fromCity}
                                                   fromAirport={flightsData.return.fromAirport}
                                                   toCity={flightsData.return.toCity}
                                                   toAirport={flightsData.return.toAirport}
                                                   departureTerminal={flightsData.return.departureTerminal}
                                                   arrivalTerminal={flightsData.return.arrivalTerminal}
                                                   departureTime={moment(flightsData.return.departureTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, do YYYY')}
                                                   arrivalTime={moment(flightsData.return.arrivalTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, do YYYY')}
                                                   cabinClass={params.cabinClass}
                                                   noOfAdults={params.noOfAdults}
                                                   noOfChildren={params.noOfChildren}
                                                   reservedSeats={chosenSeats.return.reduce(((previousValue, currentValue, currentIndex) => {return currentIndex !== chosenSeats.return.length - 1 ? `${previousValue} ${currentValue},` : `${previousValue} ${currentValue}`}), '')}
                                                   flightNumber={flightsData.return.flightNumber}
                                                   flightPrice={parseInt(flightsData.return.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)
                                                   + parseInt(flightsData.return.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)}
                                                   baggageAllowance={flightsData.return.baggageAllowance}
                                            />}
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
                                        {isSeatsLoading.return ? null :
                                            <Deposits title={"Return Flight Seats"} seats={returnSeats} flightType={'return'} chosenSeatsCallback={setChosenSeats}/>}
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
