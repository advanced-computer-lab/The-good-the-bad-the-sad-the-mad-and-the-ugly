import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function FlightCard(props) {
    const flight = props.flight;
    const departureDate = new Date(flight.departure);
    const arrivalDate = new Date(flight.arrival);

    function handleClick(){
                if (props.departure){
                    if (props.selected){
                        props.onBookingDepartureFunction(null);
                    }
                    else {
                    props.onBookingDepartureFunction(flight._id);
                    }
                }
                else {
                    if (props.selected){
                        props.onBookingReturningFunction(null);
                    }
                    else {
                    props.onBookingReturningFunction(flight._id);
                    }
                }
    }
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Flight Number: {flight.flightNumber}
                </Typography>
                <Typography variant="h5" component="div">
                    From {flight.from}({flight.departureAirport}) To {flight.to}({flight.arrivalAirport})
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">

                    Departure Date: {departureDate.getFullYear() + '-' + (departureDate.getMonth() + 1) + '-' + departureDate.getDate()}
                    <br />
                    Departure Time: {(departureDate.getHours() <= 9 ? "0" + departureDate.getHours() : departureDate.getHours()) + ':' + (departureDate.getMinutes() <= 9 ? "0" + departureDate.getMinutes() : departureDate.getMinutes())}
                    <br />
                    <br />
                    Arrival Date : {arrivalDate.getFullYear() + '-' + (arrivalDate.getMonth() + 1) + '-' + arrivalDate.getDate()}
                    <br />
                    Arrival Time: {(arrivalDate.getHours() <= 9 ? "0" + arrivalDate.getHours() : arrivalDate.getHours()) + ':' + (arrivalDate.getMinutes() <= 9 ? "0" + arrivalDate.getMinutes() : arrivalDate.getMinutes())}
                </Typography>
            </CardContent>

            <CardActions>
                <Button  onClick={handleClick} size="large"> {props.selected?"Booked!":"Book Now"} </Button>
            </CardActions>
        </React.Fragment>
    );

    return (<Box sx={{ minWidth: 275 }}>
        <Card sx={{ bgcolor: 'text.disabled' }} variant="outlined">{card}</Card>
    </Box>);
}
export default FlightCard;