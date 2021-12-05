import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from './Title';
import {Box, Grid} from "@mui/material";

// Generate Sales Data
function createData(time, amount) {
    return {time, amount};
}


export default function Chart(props) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Box>
                <Grid container>
                    <Grid item xs={6}>
                        <div><h4 style={{marginTop: 16, marginBottom: 16}}>From:</h4>
                            <p>{props.fromCity}, {props.fromAirport}</p></div>
                    </Grid>
                    <Grid item xs={6}>
                        <div><h4 style={{marginTop: 16, marginBottom: 16}}>To:</h4>
                            <p>{props.toCity}, {props.toAirport}</p></div>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Departure Terminal:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.departureTerminal}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Arrival Terminal:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.arrivalTerminal}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={5}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Departure Time:</h4>
                            </Grid>
                            <Grid item xs={7}>
                                <p>{props.departureTime}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={5}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Arrival Time:</h4>
                            </Grid>
                            <Grid item xs={7}>
                                <p>{props.arrivalTime}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Class:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.cabinClass}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Adults:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.noOfAdults}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Children:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.noOfChildren}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Reserved Seats:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.reservedSeats}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Flight Number:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.flightNumber}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Ticket Price:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{props.flightPrice} EGP</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={7}>
                                <h4 style={{marginTop: 16, marginBottom: 16}}>Baggage Allowance:</h4>
                            </Grid>
                            <Grid item xs={5}>
                                <p>{props.baggageAllowance} Kg</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
