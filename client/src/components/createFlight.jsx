import React, {Component} from 'react';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import {LocalizationProvider, MobileDateTimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {FieldFeedback, FieldFeedbacks} from "react-form-with-constraints";
import Divider from "@mui/material/Divider";
import {Alert} from '@mui/material'


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
            negativeErr: '',
            arrivalTerminal: '',
            departureTerminal: '',
            economyPriceAdult: '',
            businessPriceAdult: '',
            firstPriceAdult: '',
            economyPriceChild: '',
            businessPriceChild: '',
            firstPriceChild: '',
            baggageAllowance: ''
        };
    }

    onChange = e => {
        if (e.target.name === "departure" || e.target.name === "arrival")
            e.target.value = formatISO(e.target.value);

        const toBeCasted = ['arrivalTerminal', 'departureTerminal', 'economyPriceAdult',
            'businessPriceAdult',
            'firstPriceAdult',
            'economyPriceChild',
            'businessPriceChild',
            'firstPriceChild',
            'baggageAllowance'];
        if(e.target.name in toBeCasted)
            e.target.value = Number(e.target.value);

        this.setState({[e.target.name]: e.target.value});
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
            },
            maxSeats: {
                economy: this.state.economy,
                business: this.state.business,
                first: this.state.first
            },
            price: {
                economy: {
                    adult: this.state.economyPriceAdult,
                    child: this.state.economyPriceChild,
                },
                business: {
                    adult: this.state.businessPriceAdult,
                    child: this.state.businessPriceChild
                },
                first: {
                    adult: this.state.firstPriceAdult,
                    child: this.state.firstPriceChild
                }
            },
            departureTerminal: this.state.departureTerminal,
            arrivalTerminal: this.state.arrivalTerminal,
            baggageAllowance: this.state.baggageAllowance
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
    fontStyle = {fontFamily: 'Montserrat', fontSize: '25px'}

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div style={{marginTop: 150}}>
                    <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                        <Typography component="h1" variant="h4" align="center">
                            Create Flight
                        </Typography>
                        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>

                            <React.Fragment>
                                <form onSubmit={this.onSubmit}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                                        <div style={{marginTop: 20, fontFamily: 'Montserrat', fontSize: '25px'}}>
                                            <Divider> Flight Info</Divider>
                                        </div>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>

                                                <TextField
                                                    required
                                                    variant="standard" fullWidth label="Flight Number"
                                                    value={this.state.flightNumber}
                                                    onChange={this.onChange} name="flightNumber"/>
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
                                                                   sx={{width: 350}} {...props}
                                                        />}
                                                    label="Departure Date"
                                                    variant="standard"/>
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
                                                                   sx={{width: 350}} {...props}
                                                        />}
                                                    label="Arrival Date"
                                                    variant="standard"/>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                {this.state.arrivalErr !== '' ?
                                                    <Alert severity="error">{this.state.arrivalErr}</Alert> : null
                                                }
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <div style={this.fontStyle}>
                                                    <Divider>
                                                        Seats Price in EGP
                                                    </Divider>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField required
                                                           fullWidth label="Economy Adult"
                                                           value={this.state.economyPriceAdult}
                                                           onChange={this.onChange}
                                                           name="economyPriceAdult"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField required
                                                           fullWidth label="Business Adult"
                                                           value={this.state.businessPriceAdult}
                                                           onChange={this.onChange}
                                                           name="businessPriceAdult"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField required
                                                           fullWidth label="First Class Adult"
                                                           value={this.state.firstPriceAdult}
                                                           onChange={this.onChange}
                                                           name="firstPriceAdult"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={4}>
                                                <TextField required
                                                           fullWidth label="Economy Child"
                                                           value={this.state.economyPriceChild}
                                                           onChange={this.onChange}
                                                           name="economyPriceChild"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField required
                                                           fullWidth label="Business Child"
                                                           value={this.state.businessPriceChild}
                                                           onChange={this.onChange}
                                                           name="businessPriceChild"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField required
                                                           fullWidth label="First Class Child"
                                                           value={this.state.firstPriceChild}
                                                           onChange={this.onChange}
                                                           name="firstPriceChild"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>


                                            <Grid item xs={12} sm={12}>
                                                <div style={this.fontStyle}>
                                                    <Divider>
                                                        Number of Seats
                                                    </Divider>
                                                </div>
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
                                                <div style={this.fontStyle}>
                                                    <Divider>
                                                        Other Info
                                                    </Divider>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField required
                                                           fullWidth label="Arrival Terminal"
                                                           value={this.state.arrivalTerminal}
                                                           onChange={this.onChange}
                                                           name="arrivalTerminal"
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField required
                                                           fullWidth label="Departure Terminal"
                                                           value={this.state.departureTerminal}
                                                           onChange={this.onChange}
                                                           name='departureTerminal'
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}></Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField required
                                                           fullWidth label="Baggage Allowance in KG"
                                                           value={this.state.baggageAllowance}
                                                           onChange={this.onChange}
                                                           name='baggageAllowance'
                                                           variant="standard"
                                                           type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}></Grid>

                                            <Grid item xs={12} sm={12}>
                                                {this.state.negativeErr}
                                            </Grid>
                                        </Grid>
                                    </LocalizationProvider>

                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            </React.Fragment>
                        </Paper>
                    </Container>
                </div>
            </ThemeProvider>

        );
    }
}

export default CreateFlight;

