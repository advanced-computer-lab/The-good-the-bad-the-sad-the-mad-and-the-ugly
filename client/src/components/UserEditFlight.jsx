import React, { Component } from 'react';
import axios from 'axios';
import Flight from './Flight'
import FlightHeading from './FlightHeading';
import FlightCard from './FlightCard';
import { Container, Grid, Paper, Table, TableBody, TableContainer, TextField, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import { LocalizationProvider, DatePicker, Alert } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Ticket from "./Ticket/Ticket";



class UserEditFlight extends Component {


    constructor() {

        super();
        var adults = 0;
        var children = 0;
        this.state = {
            flightDate: formatISO(new Date()),
            seatClass: 'economy',
            arrivalErr: '',
            selectionErr: '',
            adultSeats: '',
            childrenSeats: '',
            limitDate: '',
            isDeparture: false,
            flights: [],
            value: '1',
            selectedDeparture: null,
            loggedIn: false,
            hasIncompleteReservation: false,
            userFirstName: '',
            reservationId: '',
            submitted: false
        };
    }


    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onBookingDeparture = id => {
        this.setState(
            {
                selectedDeparture: id
            }
        );
    }

    onBookingReturning = id => {
        this.setState(
            {
                selectedReturning: id
            }
        );
    }

    onSubmit = e => {
        e.preventDefault();
        const data = {
            from: this.props.from,
            to: this.props.to,
            flightDate: this.state.flightDate,
            seatClass: this.state.seatClass,
            adultSeats: this.props.adultSeats,
            childrenSeats: this.props.childrenSeats,
            isDeparture: this.props.isDeparture === 'true'
        };



        axios
            .post('http://localhost:8000/flight/userEditFlight', data)
            .then(res => {
                this.adults = parseInt(this.state.adultSeats);
                this.children = parseInt(this.state.childrenSeats);
                this.setState({
                    flightDate: formatISO(new Date()),
                    arrivalErr: '',
                    selectionErr: '',
                    adultSeats: '',
                    childrenSeats: '',
                    isDeparture: this.props.isDeparture === 'true',
                    submitted: true,
                    flights: res.data
                })
            })
            .catch(err => {
                console.log("Error in Show Flights POST \n", err);
            })


    };


    handleClick = () => {
        if (this.state.selectedDeparture == null) {
            this.setState({
                selectionErr: 'Please select a departure flight to continue'
            });

        } else {
            console.log(this.state);
            window.location.href = 'http://localhost:3000';
        }
    };

    componentDidMount() {



        axios.get('http://localhost:8000/login/authorize')
            .then(
                res1 => {
                    if (res1.data.success) {
                        this.setState({
                            ...this.state,
                            userFirstName: res1.data.firstName,
                            loggedIn: true,
                        })
                        axios.get(`http://localhost:8000/reservation/getReservationById/${this.props.reservationId}`)
                            .then(
                                res2 => {
                                    if (res2.data.userId && res2.data.userId === res1.data.userId) {
                                        this.setState({
                                            limitDate: this.props.flightDate,
                                            isDeparture: this.props.isDeparture === 'true'
                                        })
                                    } else {
                                        // console.log(res1);
                                        window.location.href = '/userProfile';
                                    }
                                }
                            )
                    } else {
                        window.location.href = '/login';
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )

        // axios.get('http://localhost:8000/login/authorize')
        //     .then(res => {
        //         if (res.data.success) {
        //             this.setState({
        //                 ...this.state,
        //                 userFirstName: res.data.firstName,
        //                 loggedIn: true,
        //             })
        //             // this.state.loggedIn = true;
        //         }
        //         axios.get('http://localhost:8000/reservation/getReservationBySessionId')
        //             .then(
        //                 res => {
        //                     if (res.data.length > 0) {
        //                         this.setState({
        //                             ...this.state,
        //                             hasIncompleteReservation: true,
        //                             reservationId: res.data
        //                         })
        //                     }
        //                 }
        //             )
        //     })
    }

    render() {

        const handleChange = (event, newValue) => {
            this.setState({
                value: newValue
            });
        };
        let flights = this.state.flights;
        let flightList = [];
        let tabLabel = this.state.isDeparture ? "Departure Flights" : "Returning Flights";
        if (flights[0] !== undefined && flights[0].length > 0) {

            flightList = (<Ticket flights={flights[0]} onBookingDepartureFunction={this.onBookingDeparture}
                    onBookingReturningFunction={this.onBookingReturning}
                    departure={true}
                    selectedId={this.state.selectedDeparture}
                    seatClass={this.state.seatClass}
                    adults={this.props.adultSeats}
                    children={this.props.childrenSeats}
                    title="Select Flight"
                    oldPrice={this.props.price}
            />);

            // flightList = flights[0].map((flight) =>
            //     <Grid item xs={2} sm={4} md={4} key={flight._id}>
            //         <FlightCard flight={flight} key={flight._id} onBookingDepartureFunction={this.onBookingDeparture}
            //             onBookingReturningFunction={this.onBookingReturning}
            //             departure={true}
            //             selected={flight._id === this.state.selectedDeparture}
            //             seatClass={this.state.seatClass}
            //             adults={this.props.adultSeats}
            //             children={this.props.childrenSeats}
            //             oldPrice={this.props.price}
            //         />
            //     </Grid>
            // );

        }
        console.log(flightList.length);
        const theme = createTheme();

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
                            Airline System
                        </Typography>
                        {this.state.loggedIn ? null :
                            <Button
                                href={'/login'}
                            >
                                Login
                            </Button>}
                        {this.state.loggedIn ? <Typography>
                            <a style={{ textDecoration: "none", color: "black" }} href={'/showUserReservations'}>Hello, {this.state.userFirstName}!</a>
                        </Typography> : null}
                        {this.state.hasIncompleteReservation ?
                            <Button
                                href={`/selectSeats/${this.state.reservationId}`}
                            >
                                Complete your booking
                            </Button> : null
                        }
                    </Toolbar>
                </AppBar> */}
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 6, md: 12 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Search Flights
                        </Typography>
                        <React.Fragment>
                            <form onSubmit={this.onSubmit}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                type='Date'
                                                placeholder='Flight Date'
                                                name='flightDate'
                                                className='form-control'
                                                minDate={!this.state.isDeparture ? parseISO(this.state.limitDate) : null}
                                                maxDate={this.state.isDeparture ? parseISO(this.state.limitDate) : null}
                                                value={parseISO(this.state.flightDate)}
                                                onChange={date => {
                                                    this.setState({
                                                        "flightDate": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField
                                                        disabled
                                                        name="flightDate"
                                                        variant="standard"
                                                        sx={{ width: 350 }} {...props}
                                                    />}
                                                label="Flight Date"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl component="fieldset" xs={12} sm={4}>
                                                <FormLabel component="legend">Class of seat</FormLabel>
                                                <RadioGroup
                                                    name="seatClass"
                                                    aria-label="seatClass"
                                                    defaultValue="economy"
                                                    value={this.state.seatClass}
                                                    onChange={this.onChange}
                                                >
                                                    <FormControlLabel value="economy" control={<Radio />}
                                                        label="Economy" />
                                                    <FormControlLabel value="business" control={<Radio />}
                                                        label="Business" />
                                                    <FormControlLabel value="first" control={<Radio />}
                                                        label="First Class" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        {this.state.arrivalErr.length > 0 && <Alert severity={"error"}> {this.state.arrivalErr}</Alert>}
                                    </Grid>
                                </LocalizationProvider>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Search
                                    </Button>
                                </Box>
                            </form>
                        </React.Fragment>
                    </Paper>
                </Container>

                {this.state.submitted ? <div>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button
                            onClick={this.handleClick}
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, ml: 3 }}
                        >
                            Next
                        </Button>
                        <Grid item xs={12} sm={12}>
                            {this.state.selectionErr.length > 0 && <Alert severity={"error"}>{this.state.selectionErr}</Alert>}
                        </Grid>
                    </Box>
                    <TabContext value={this.state.value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label={tabLabel} value="1" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {flightList.length === 0 ? "No flights are available" : flightList}
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </div> : <div></div>}


            </ThemeProvider>
        );

    }
}
export default UserEditFlight;