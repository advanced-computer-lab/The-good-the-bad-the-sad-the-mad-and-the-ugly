import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Seats/Chart';
import Deposits from './Seats/Deposits';
// import Orders from './Orders';
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>

        </Typography>
    );
}


const mdTheme = createTheme();

function DashboardContent(props) {
    let params = useParams();
    const navigate = useNavigate();

    // const [open, setOpen] = React.useState(true);
    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };

    const [seats, handleSeats] = useState({availableSeats: 0, maxSeats: 0, reservedSeats: []});
    // const [returnSeats, handleReturnSeats] = useState({availableSeats: 0, maxSeats: 0, reservedSeats: []});
    const [isSeatsLoading, setSeatsLoading] = useState(true);
    const [isFlightsLoading, setFlightsLoading] = useState(true);
    const [flightsData, setFlightsData] = useState({
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

    });
    const [chosenSeats, setChosenSeats] = useState([]);
    const [missingSeats, setMissingSeats] = useState(false);
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    const [reservationId, setReservationId] = useState('');
    const [seatsVisible, setSeatsVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userFirstName, setUserFirstName] = useState('');
    const [seatsNotAvailable, setSeatsNotAvailable] = useState(false);

    useEffect(() => {
        // if (params.reservationId) {
        axios.get(`http://localhost:8000/reservation/getReservationById/${params.reservationId}`)
            .then(
                res => {
                    console.log(params.reservationId);
                    params.departureFlightId = res.data.departureFlightId;
                    params.returnFlightId = res.data.returnFlightId;
                    params.noOfAdults = res.data.noOfAdults;
                    params.noOfChildren = res.data.noOfChildren;
                    params.cabinClass = res.data.cabinClass;
                    setChosenSeats(res["data"][params.flightType]);
                    fetchData(params.flightType === 'departureSeats' ? res.data.departureFlightId : res.data.returnFlightId, res.data.cabinClass, res.data.noOfAdults, res.data.noOfChildren);
                }
            )
        // }
        // else {
        //     fetchData(params.departureFlightId, params.returnFlightId, params.cabinClass, params.noOfAdults, params.noOfChildren);
        // }

        axios.get('http://localhost:8000/login/authorize')
            .then(
                res => {
                    if (res.data.success) {
                        setLoggedIn(true);
                        setUserFirstName(res.data.firstName);
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )

    }, []);

    function fetchData(FlightId, cabinClass, noOfAdults, noOfChildren) {
        axios.get(`http://localhost:8000/flight/getFlightById/${FlightId}`)
            .then(
                res1 => {
                    axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${FlightId}/${cabinClass}`)
                        .then(
                            res2 => {
                                handleSeats(
                                    {
                                        availableSeats: res1.data.maxSeats[cabinClass],
                                        maxSeats: parseInt(noOfAdults) + parseInt(noOfChildren),
                                        reservedSeats: res2.data
                                    }
                                );
                                setSeatsLoading(false)
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

        // axios.get(`http://localhost:8000/flight/getFlightById/${returnFlightId}`)
        //     .then(
        //         res1 => {
        //             axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${returnFlightId}/${cabinClass}`)
        //                 .then(
        //                     res2 => {
        //                         handleReturnSeats(
        //                             {
        //                                 availableSeats: res1.data.maxSeats[cabinClass],
        //                                 maxSeats: params.reservationId ? 0 : parseInt(noOfAdults) + parseInt(noOfChildren),
        //                                 reservedSeats: res2.data
        //                             }
        //                         );
        //                         setSeatsLoading((prevState => {
        //                             return {
        //                                 ...prevState,
        //                                 return: false,
        //                             }
        //                         }))
        //                     }
        //                 )
        //
        //             //console.log(depSeats);
        //         }
        //     )
        //     .catch(
        //         err => {
        //             console.log(err);
        //         }
        //     );

        axios.get(`http://localhost:8000/flight/getFlightById/${FlightId}`)
            .then(res => {
                // console.log(moment.utc(res.data.departure, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ+00:00'));
                // console.log(moment.utc(res.data.departure, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ+00:00').format('hh:mm MMM, Do YYYY'));
                setFlightsData({
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
                );

                setFlightsLoading(false);

                // console.log(flightsData.dep.flightPrice[params.cabinClass]['adult']);
            })
            .catch(err => {
                console.log(err);
            });

        // axios.get(`http://localhost:8000/flight/getFlightById/${returnFlightId}`)
        //     .then(res => {
        //         setFlightsData((prevState => {
        //             return {
        //                 ...prevState,
        //                 return: {
        //                     fromCity: res.data.from,
        //                     fromAirport: res.data.departureAirport,
        //                     toCity: res.data.to,
        //                     toAirport: res.data.arrivalAirport,
        //                     departureTerminal: res.data.departureTerminal,
        //                     arrivalTerminal: res.data.arrivalTerminal,
        //                     departureTime: res.data.departure,
        //                     arrivalTime: res.data.arrival,
        //                     flightPrice: res.data.price,
        //                     baggageAllowance: res.data.baggageAllowance,
        //                     flightNumber: res.data.flightNumber
        //                 }
        //             }
        //         }))
        //         // console.log(flightsData.return);
        //         setFlightsLoading((prevState => {
        //             return {
        //                 ...prevState,
        //                 return: false,
        //             }
        //         }));
        //
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    function handleSubmit() {
        let requiredSeats = parseInt(params.noOfAdults) + parseInt(params.noOfChildren);
        if (chosenSeats.length < requiredSeats) {
            setMissingSeats(true);
        } else {
            setMissingSeats(false);
            let reservation = {
                // departureFlightId: params.departureFlightId,
                // returnFlightId: params.returnFlightId,
                // noOfAdults: params.noOfAdults,
                // noOfChildren: params.noOfChildren,
                // cabinClass: params.cabinClass,
                [params.flightType]: chosenSeats,
                // returnSeats: chosenSeats.return,
                // timestamp: Date.now(),
                // totalPrice: parseInt(flightsData.return.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)
                //     + parseInt(flightsData.return.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)
                //     + parseInt(flightsData.dep.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)
                //     + parseInt(flightsData.dep.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)
            }
            // axios.get('http://localhost:8000/login/authorize')
            //     .then(res => {
            //         if (res.data.success) {
            //             reservation.confirmed = true;
            //             reservation.userId = res.data.userId;
            //             if (params.reservationId) {
            // reservation.userId = res.data.userId;
            // console.log(reservation);
            axios.put(`http://localhost:8000/reservation/updateReservation/${params.reservationId}`, reservation)
                .then(res => {
                    // console.log(res.data);
                    setReservationId(params.reservationId);
                    setSuccessfulSubmit((prevState => {
                        setSeatsVisible(true);
                        return true;
                    }));
                })
            // }
            // else {
            //     axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${reservation.departureFlightId}/${reservation.cabinClass}`)
            //         .then(
            //             res => {
            //                 reservation.departureSeats = reservation.departureSeats.filter((element) => !res.data.includes(element));
            //                 if (reservation.departureSeats.length < requiredSeats) {
            //                     setSeatsNotAvailable(true);
            //                 } else {
            //                     axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${reservation.returnFlightId}/${reservation.cabinClass}`)
            //                         .then(
            //                             res1 => {
            //                                 reservation.returnSeats = reservation.returnSeats.filter((element) => !res1.data.includes(element));
            //                                 if (reservation.returnSeats.length < requiredSeats) {
            //                                     setSeatsNotAvailable(true);
            //                                 } else {
            //                                     axios.post('http://localhost:8000/reservation/createReservation', reservation)
            //                                         .then(res => {
            //                                             console.log('Reservation successful');
            //                                             // console.log(res.data);
            //                                             setReservationId(res.data.reservationId);
            //                                             setSuccessfulSubmit((prevState => {
            //                                                 setSeatsVisible(true);
            //                                                 return true;
            //                                             }));
            //                                         })
            //                                         .catch(err => {
            //                                             console.log(err);
            //                                         });
            //                                 }
            //                             }
            //                         )
            //                 }
            //             }
            //         )
            //
            // }
            // }
            // else {
            //     reservation.confirmed = false;
            //     // console.log(reservation);
            //     axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${reservation.departureFlightId}/${reservation.cabinClass}`)
            //         .then(
            //             res => {
            //                 reservation.departureSeats = reservation.departureSeats.filter((element) => !res.data.includes(element));
            //                 if (reservation.departureSeats.length < requiredSeats) {
            //                     setSeatsNotAvailable(true);
            //                 } else {
            //                     axios.get(`http://localhost:8000/reservation/getReservedSeatsInFlight/${reservation.returnFlightId}/${reservation.cabinClass}`)
            //                         .then(
            //                             res1 => {
            //                                 reservation.returnSeats = reservation.returnSeats.filter((element) => !res1.data.includes(element));
            //                                 if (reservation.returnSeats.length < requiredSeats) {
            //                                     setSeatsNotAvailable(true);
            //                                 } else {
            //                                     axios.post('http://localhost:8000/reservation/createReservation', reservation)
            //                                         .then(res => {
            //                                             console.log('Reservation unconfirmed');
            //                                             // console.log(res.data);
            //                                             // setReservationId(res.data.reservationId);
            //                                             // setSuccessfulSubmit((prevState => {
            //                                             //     setSeatsVisible(true);
            //                                             //     return true;
            //                                             // }));
            //                                             navigate('/login');
            //                                         })
            //                                         .catch(err => {
            //                                             console.log(err);
            //                                         });
            //                                 }
            //                             }
            //                         )
            //                 }
            //             }
            //         )
            //
            // }
            // })
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box>
                <CssBaseline/>
                <div>
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position={"static"} sx={{flexGrow: 1}}>
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    <a style={{textDecoration: "none", color: "white"}} href={'/userShowFlights'}>Airline
                                        System</a>
                                </Typography>

                                {loggedIn ? null :
                                    <Button
                                        href={'/login'}
                                        color={"inherit"}
                                    >
                                        Login
                                    </Button>}
                                {loggedIn ? <Typography>
                                    <a style={{textDecoration: "none", color: "white"}}
                                       href={'/showUserReservations'}>Hello, {userFirstName}!</a>
                                </Typography> : null}
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
                                        {isFlightsLoading ? null : <Chart
                                            title="Departure Ticket"
                                            fromCity={flightsData.fromCity}
                                            fromAirport={flightsData.fromAirport}
                                            toCity={flightsData.toCity}
                                            toAirport={flightsData.toAirport}
                                            departureTerminal={flightsData.departureTerminal}
                                            arrivalTerminal={flightsData.arrivalTerminal}
                                            departureTime={moment.utc(flightsData.departureTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                                            arrivalTime={moment.utc(flightsData.arrivalTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}
                                            cabinClass={params.cabinClass}
                                            noOfAdults={params.noOfAdults}
                                            noOfChildren={params.noOfChildren}
                                            reservedSeats={chosenSeats.reduce(((previousValue, currentValue, currentIndex) => {
                                                return currentIndex !== chosenSeats.length - 1 ? `${previousValue} ${currentValue},` : `${previousValue} ${currentValue}`
                                            }), '')}
                                            flightNumber={flightsData.flightNumber}
                                            flightPrice={parseInt(flightsData.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)
                                            + parseInt(flightsData.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)}
                                            baggageAllowance={flightsData.baggageAllowance}
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
                                        {isSeatsLoading ? null :
                                            <Deposits title={"Departure Flight Seats"} seats={seats}
                                                // flightType={'dep'}
                                                      chosenSeatsCallback={setChosenSeats}
                                                      visible={seatsVisible}
                                                      editableSeats={chosenSeats}
                                            />}
                                    </Paper>
                                </Grid>


                            </Grid>

                            <Grid container spacing={3} style={{marginTop: 10}}>
                                {/* Chart */}
                                {/*<Grid item xs={12} md={6} lg={7}>*/}
                                {/*    <Paper*/}
                                {/*        sx={{*/}
                                {/*            p: 2,*/}
                                {/*            display: 'flex',*/}
                                {/*            flexDirection: 'column'*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        {isFlightsLoading.return ? null :*/}
                                {/*            <Chart title="Return Ticket"*/}
                                {/*                   fromCity={flightsData.return.fromCity}*/}
                                {/*                   fromAirport={flightsData.return.fromAirport}*/}
                                {/*                   toCity={flightsData.return.toCity}*/}
                                {/*                   toAirport={flightsData.return.toAirport}*/}
                                {/*                   departureTerminal={flightsData.return.departureTerminal}*/}
                                {/*                   arrivalTerminal={flightsData.return.arrivalTerminal}*/}
                                {/*                   departureTime={moment.utc(flightsData.return.departureTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}*/}
                                {/*                   arrivalTime={moment.utc(flightsData.return.arrivalTime, 'YYYY-MM-DD"T"hh:mm:ss.SSSZ').format('hh:mm MMM, Do YYYY')}*/}
                                {/*                   cabinClass={params.cabinClass}*/}
                                {/*                   noOfAdults={params.noOfAdults}*/}
                                {/*                   noOfChildren={params.noOfChildren}*/}
                                {/*                   reservedSeats={chosenSeats.return.reduce(((previousValue, currentValue, currentIndex) => {*/}
                                {/*                       return currentIndex !== chosenSeats.return.length - 1 ? `${previousValue} ${currentValue},` : `${previousValue} ${currentValue}`*/}
                                {/*                   }), '')}*/}
                                {/*                   flightNumber={flightsData.return.flightNumber}*/}
                                {/*                   flightPrice={parseInt(flightsData.return.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)*/}
                                {/*                   + parseInt(flightsData.return.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)}*/}
                                {/*                   baggageAllowance={flightsData.return.baggageAllowance}*/}
                                {/*            />}*/}
                                {/*    </Paper>*/}
                                {/*</Grid>*/}
                                {/* Recent Deposits */}
                                {/*<Grid item xs={12} md={6} lg={5}>*/}
                                {/*    <Paper*/}
                                {/*        sx={{*/}
                                {/*            p: 2,*/}
                                {/*            display: 'flex',*/}
                                {/*            flexDirection: 'column'*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        {isSeatsLoading.return ? null :*/}
                                {/*            <Deposits title={"Return Flight Seats"} seats={returnSeats}*/}
                                {/*                      flightType={'return'} chosenSeatsCallback={setChosenSeats}*/}
                                {/*                      visible={seatsVisible}/>}*/}
                                {/*    </Paper>*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>*/}
                                {/*        {isFlightsLoading.dep || isFlightsLoading.return ? null :*/}
                                {/*            <Orders successfulSubmit={successfulSubmit} missingSeats={missingSeats}*/}
                                {/*                    handleSubmit={handleSubmit} totalPrice={*/}
                                {/*                parseInt(flightsData.return.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)*/}
                                {/*                + parseInt(flightsData.return.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)*/}
                                {/*                + parseInt(flightsData.dep.flightPrice[params.cabinClass]['adult']) * parseInt(params.noOfAdults)*/}
                                {/*                + parseInt(flightsData.dep.flightPrice[params.cabinClass]['child']) * parseInt(params.noOfChildren)*/}
                                {/*            }*/}
                                {/*                    reservationId={reservationId}*/}
                                {/*                    seatsNotAvailable={seatsNotAvailable}*/}
                                {/*            />}*/}
                                {/*    </Paper>*/}
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
