import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { FieldFeedback, FieldFeedbacks } from "react-form-with-constraints";


const theme = createTheme();

class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            departure: '',
            arrival: '',
            to: '',
            from: '',
            economy: '',
            business: '',
            first: '',
            arrivalErr: '',
            negativeErr: ''
        };
    }

    onChange = e => {
        if (e.target.name === "departure" || e.target.name === "arrival")
            e.target.value = formatISO(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };


    onSubmit = e => {
        e.preventDefault();
        if (this.state.arrival <= this.state.departure) {
            this.setState({
                arrivalErr: "Arrival date must be after the departure date!",
                negativeErr: ''
            });
            return;
        }
        if (this.state.economy < 0 || this.state.first < 0 || this.state.business < 0) {
            this.setState({
                negativeErr: "The number of seats can not be negative!",
                arrivalErr: ''
            });
            return;
        }

        const data = {
            flightNumber: this.state.flightNumber,
            departureAirport: this.state.departureAirport,
            arrivalAirport: this.state.arrivalAirport,
            departure: this.state.departure,
            arrival: this.state.arrival,
            to: this.state.to,
            from: this.state.from,
            availableSeats: {
                economy: this.state.economy,
                business: this.state.business,
                first: this.state.first
            }
        };

        axios
            .post('http://localhost:8000/flight/', data)
            .then(() => {
                this.setState({
                    flightNumber: '',
                    departureAirport: '',
                    arrivalAirport: '',
                    departure: '',
                    arrival: '',
                    to: '',
                    from: '',
                    economy: '',
                    business: '',
                    first: '',
                    arrivalErr: '',
                    negativeErr: ''
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
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
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Create Flight
                        </Typography>
                        <React.Fragment>
                            <form onSubmit={this.onSubmit}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>

                                            <TextField
                                                required
                                                variant="standard" fullWidth label="Flight Number"
                                                value={this.state.flightNumber}
                                                onChange={this.onChange} name="flightNumber" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth label="From" value={this.state.from}
                                                onChange={this.onChange}
                                                name="from"
                                                variant="standard"
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField required fullWidth label="To" value={this.state.to}
                                                onChange={this.onChange}
                                                name="to"
                                                variant="standard"
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField required fullWidth label="Departure Airport"
                                                value={this.state.departureAirport}
                                                onChange={this.onChange}
                                                name="departureAirport"
                                                variant="standard"
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField required fullWidth label="Arrival Airport"
                                                value={this.state.arrivalAirport}
                                                onChange={this.onChange}
                                                name="arrivalAirport"
                                                variant="standard"
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <MobileDateTimePicker
                                                required
                                                value={parseISO(this.state.departure)}
                                                onChange={date => {
                                                    console.log(date);
                                                    this.setState({
                                                        "departure": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled
                                                        fullWidth
                                                        name="departure"
                                                        variant="standard"
                                                        sx={{ width: 350 }} {...props}
                                                    />}
                                                label="Departure Date"
                                                variant="standard" />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <MobileDateTimePicker
                                                required
                                                value={parseISO(this.state.arrival)}
                                                onChange={date => {
                                                    this.setState({
                                                        "arrival": date !== null ? formatISO(date) : formatISO(Date.now())
                                                    });
                                                }
                                                }
                                                renderInput={(props) =>
                                                    <TextField disabled
                                                        fullWidth
                                                        name="arrival"
                                                        variant="standard"
                                                        sx={{ width: 350 }} {...props}
                                                    />}
                                                label="Arrival Date"
                                                variant="standard" />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            {this.state.arrivalErr}
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <TextField required
                                                fullWidth label="Economy" value={this.state.economy}
                                                onChange={this.onChange}
                                                name="economy"
                                                variant="standard"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField required
                                                fullWidth label="Business" value={this.state.business}
                                                onChange={this.onChange}
                                                name="business"
                                                variant="standard"
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField required
                                                fullWidth label="First Class" value={this.state.first}
                                                onChange={this.onChange}
                                                name="first"
                                                variant="standard"
                                                type="number"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            {this.state.negativeErr}
                                        </Grid>
                                    </Grid>
                                </LocalizationProvider>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </React.Fragment>
                    </Paper>
                </Container>
            </ThemeProvider>

        );
    }
}

export default CreateFlight;

