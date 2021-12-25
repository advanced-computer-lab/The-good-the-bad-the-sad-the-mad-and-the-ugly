import React, {Component} from 'react';
import axios from 'axios';
import Flight from './Flight'
import FlightHeading from './FlightHeading';
import {Container, Grid, Paper, Table, TableBody, TableContainer, TextField, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import {LocalizationProvider, MobileDateTimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FlightDetails from "./Flights/FlightDetails";

class ShowFlights extends Component {

    constructor() {

        super();

        this.state = {
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            from: '',
            to: '',
            departure1: formatISO(new Date()),
            departure2: formatISO(new Date()),
            arrival1: formatISO(new Date()),
            arrival2: formatISO(new Date()),
            economy: '',
            business: '',
            first: '',
            flights: []
        };
        this.deleteFlight = this.deleteFlight.bind(this)
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            flightNumber: this.state.flightNumber,
            departureAirport: this.state.departureAirport,
            arrivalAirport: this.state.arrivalAirport,
            from: this.state.from,
            to: this.state.to,
            departure1: this.state.departure1,
            departure2: this.state.departure2,
            arrival1: this.state.arrival1,
            arrival2: this.state.arrival2,
            availableSeats: {
                economy: parseInt(this.state.economy),
                business: parseInt(this.state.business),
                first: parseInt(this.state.first),
            }
        };


        axios
            .post('http://localhost:8000/flight/showFlights', data)
            .then(res => {
                this.setState({
                    flightNumber: '',
                    departureAirport: '',
                    arrivalAirport: '',
                    from: '',
                    to: '',
                    departure1: formatISO(new Date()),
                    departure2: formatISO(new Date()),
                    arrival1: formatISO(new Date()),
                    arrival2: formatISO(new Date()),
                    economy: '',
                    business: '',
                    first: '',
                    flights: res.data
                })

            })
            .catch(err => {
                console.log("Error in Show Flights POST \n", err);
            })
    };

    deleteFlight(event) {
        axios
            .delete('http://localhost:8000/flight/delete/' + event.target.name)
            .then(res => {
                let flightRemoved = res.data;
                let newFlights = [];
                this.state.flights.forEach(function (item) {
                    if (item._id !== flightRemoved._id)
                        newFlights.push(item);
                })
                this.setState({
                    flights: newFlights
                })
            })
    }

    render() {
        let flights = this.state.flights;
        let flightList;
        if (!flights) {
            flightList = "there is no flight record!";
        } else {
            flightList = flights.map((flight, k) =>
                <FlightDetails flight={flight} idx={k} key={k} deleteFunction={this.deleteFlight}/>
            );
        }
        const theme = createTheme();


        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container component="main" maxWidth="md" sx={{mb: 4, mt:10}}>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                        <Typography component="h1" variant="h4" align="center">
                            Search Flights
                        </Typography>
                        <React.Fragment>
                            <form noValidate onSubmit={this.onSubmit}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                variant="standard" fullWidth label="Flight Number"
                                                value={this.state.flightNumber}
                                                onChange={this.onChange} name="flightNumber"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Departure Airport"
                                                       value={this.state.departureAirport}
                                                       onChange={this.onChange}
                                                       name="departureAirport"
                                                       variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Arrival Airport"
                                                       value={this.state.arrivalAirport}
                                                       onChange={this.onChange}
                                                       name="arrivalAirport"
                                                       variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="From" value={this.state.from}
                                                onChange={this.onChange}
                                                name="from"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField label="To" value={this.state.to}
                                                       onChange={this.onChange}
                                                       name="to"
                                                       variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MobileDateTimePicker
                                                type='Date'
                                                placeholder='Departure1'
                                                name='departure1'
                                                className='form-control'
                                                value={parseISO(this.state.departure1)}
                                                onChange={date => {
                                                    this.setState({
                                                        "departure1": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled

                                                               name="departure1"
                                                               variant="standard"
                                                               sx={{width: 350}} {...props}
                                                    />}
                                                label="Departure Date 1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MobileDateTimePicker
                                                type='Date'
                                                placeholder='Departure2'
                                                name='departure2'
                                                className='form-control'
                                                value={parseISO(this.state.departure2)}
                                                onChange={date => {
                                                    this.setState({
                                                        "departure2": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled

                                                               name="departure2"
                                                               variant="standard"
                                                               sx={{width: 350}} {...props}
                                                    />}
                                                label="Departure Date 2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MobileDateTimePicker
                                                type='Date'
                                                placeholder='Arrival1'
                                                name='arrival1'
                                                className='form-control'
                                                value={parseISO(this.state.arrival1)}
                                                onChange={date => {
                                                    this.setState({
                                                        "arrival1": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled

                                                               name="arrival1"
                                                               variant="standard"
                                                               sx={{width: 350}} {...props}
                                                    />}
                                                label="Arrival Date 1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MobileDateTimePicker
                                                type='Date'
                                                placeholder='Arrival2'
                                                name='arrival2'
                                                className='form-control'
                                                value={parseISO(this.state.arrival2)}
                                                onChange={date => {
                                                    this.setState({
                                                        "arrival2": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled

                                                               name="arrival2"
                                                               variant="standard"
                                                               sx={{width: 350}} {...props}
                                                    />}
                                                label="Arrival Date 2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label="Economy" value={this.state.economy}
                                                onChange={this.onChange}
                                                name="economy"
                                                variant="standard"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label="Business" value={this.state.business}
                                                onChange={this.onChange}
                                                name="business"
                                                variant="standard"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                label="First Class" value={this.state.first}
                                                onChange={this.onChange}
                                                name="first"
                                                variant="standard"
                                                type="number"
                                            />
                                        </Grid>
                                        {/*<button type="submit">View Flights</button>*/}
                                    </Grid>
                                </LocalizationProvider>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        Search
                                    </Button>
                                </Box>
                            </form>
                        </React.Fragment>
                    </Paper>
                </Container>
                {/*<TableContainer component={Paper} sx={{mt: 3, mx: 1}}>*/}
                {/*    <Table>*/}
                {/*        <FlightHeading/>*/}

                {/*        <TableBody>*/}
                {/*        {flightList}*/}
                {/*        </TableBody>*/}
                {/*        */}
                {/*    </Table>*/}

                {/*</TableContainer>*/}

                <Container component="main" maxWidth="md" sx={{mt: 10}}>
                    {flightList}
                </Container>

            </ThemeProvider>
        );

    }
}

export default ShowFlights;