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
import { LocalizationProvider, DatePicker } from "@mui/lab";
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




class UserShowFlights extends Component {


    constructor() {

        super();
        var adults = 0;
        var children =0;
        this.state = {
            from: '',
            to: '',
            departure: formatISO(new Date()),
            returning: formatISO(new Date()),
            seatClass: 'economy',
            adultSeats: '',
            childrenSeats: '',
            arrivalErr: '',
            selectionErr: '',
            flights: [[], []],
            value: '1',
            selectedDeparture: null,
            selectedReturning: null
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

        if (this.state.returning < this.state.departure) {
            this.setState({
                arrivalErr: "Returning date must be after the departure date!"
            });
            return;
        }
        if (parseInt(this.state.adultSeats) <= 0 || parseInt(this.state.adultSeats) + parseInt(this.state.childrenSeats) <= 0) {
            this.setState({
                arrivalErr: "There has to be at least one adult!"
            });
            return;
        }

        const data = {
            from: this.state.from,
            to: this.state.to,
            departure: this.state.departure,
            returning: this.state.returning,
            seatClass: this.state.seatClass,
            adultSeats: this.state.adultSeats,
            childrenSeats: this.state.childrenSeats
        };


        axios
            .post('http://localhost:8000/flight/userShowFlights', data)
            .then(res => {

                this.adults = parseInt(this.state.adultSeats);
                this.children = parseInt(this.state.childrenSeats);
                this.setState({
                    from: '',
                    to: '',
                    departure: formatISO(new Date()),
                    returning: formatISO(new Date()),
                    arrivalErr: '',
                    adultSeats: '',
                    childrenSeats: '',
                    selectionErr: '',
                    flights: res.data
                })

            })
            .catch(err => {
                console.log("Error in Show Flights POST \n", err);
            })


    };


    handleClick = () => {
        if (this.state.selectedDeparture == null || this.state.selectedReturning == null) {
            this.setState({
                selectionErr: 'Please select a departure and a returning flights to continue'
            });

        } else {
            console.log(this.state);
            window.location.href = 'http://localhost:3000/selectSeats/' + this.state.selectedDeparture + '/' + this.state.selectedReturning + '/' + this.adults+ '/' + this.children + '/' + this.state.seatClass;
        }
    };



    render() {

        const handleChange = (event, newValue) => {
            this.setState({
                value: newValue
            });
        };
        let flights = this.state.flights;
        let departureFlightList = [];
        let returningFlightList = [];
        //console.log(flights);
        if (flights[0] !== undefined && flights[1] !== undefined && flights[0].length > 0 && flights[1].length > 0) {
            departureFlightList = flights[0].map((flight) =>
                <Grid item xs={2} sm={4} md={4} key={flight._id} >
                    <FlightCard flight={flight} key={flight._id} onBookingDepartureFunction={this.onBookingDeparture}
                        onBookingReturningFunction={this.onBookingReturning}
                        departure={true}
                        selected={flight._id === this.state.selectedDeparture} 
                        seatClass = {this.state.seatClass}
                        adults = {this.adults}
                        children = {this.children}
                        />
                </Grid>
            );

            returningFlightList = flights[1].map((flight) =>
                <Grid item xs={2} sm={4} md={4} key={flight._id} >
                    <FlightCard flight={flight} key={flight._id} onBookingDepartureFunction={this.onBookingDeparture}
                        onBookingReturningFunction={this.onBookingReturning}
                        departure={false}
                        selected={flight._id === this.state.selectedReturning}
                        seatClass = {this.state.seatClass}
                        adults = {this.adults}
                        children = {this.children} />
                </Grid>
            );
        }
        const theme = createTheme();


        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Airline System
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Search Flights
                        </Typography>
                        <React.Fragment>
                            <form onSubmit={this.onSubmit}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                label="From" value={this.state.from}
                                                onChange={this.onChange}
                                                name="from"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField label="To" value={this.state.to}
                                                required
                                                onChange={this.onChange}
                                                name="to"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                type='Date'
                                                placeholder='Departure'
                                                name='departure'
                                                className='form-control'
                                                value={parseISO(this.state.departure)}
                                                onChange={date => {
                                                    this.setState({
                                                        "departure": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled

                                                        name="departure"
                                                        variant="standard"
                                                        sx={{ width: 350 }} {...props}
                                                    />}
                                                label="Departure Date"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                type='Date'
                                                placeholder='returning'
                                                name='returning'
                                                className='form-control'
                                                value={parseISO(this.state.returning)}
                                                onChange={date => {
                                                    this.setState({
                                                        "returning": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled

                                                        name="returning"
                                                        variant="standard"
                                                        sx={{ width: 350 }} {...props}
                                                    />}
                                                label="Returning Date"
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
                                                    <FormControlLabel value="economy" control={<Radio />} label="Economy" />
                                                    <FormControlLabel value="business" control={<Radio />} label="Business" />
                                                    <FormControlLabel value="first" control={<Radio />} label="First Class" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    label="Adult Seats" value={this.state.adultSeats}
                                                    onChange={this.onChange}
                                                    name="adultSeats"
                                                    variant="standard"
                                                    type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    label="Children Seats" value={this.state.childrenSeats}
                                                    onChange={this.onChange}
                                                    name="childrenSeats"
                                                    variant="standard"
                                                    type="number"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        {this.state.arrivalErr}
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
                        {this.state.selectionErr}
                    </Grid>
                </Box>
                <TabContext value={this.state.value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Departure Flights" value="1" />
                            <Tab label="Returning Flights" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {departureFlightList}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {returningFlightList}
                        </Grid>

                    </TabPanel>
                </TabContext>
            </ThemeProvider>
        );

    }
}

export default UserShowFlights;