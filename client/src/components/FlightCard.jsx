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
    const duration = Math.abs(arrivalDate - departureDate);
    const diff = Math.ceil(duration / (1000 * 60));
    const diffHours = Math.ceil(diff / 60);
    const diffMinutes = diff % 60;
    const oldPrice = props.oldPrice;
    const price = parseInt(props.adults) * parseInt(flight.price[props.seatClass]["adult"]) + parseInt(props.children) * parseInt(flight.price[props.seatClass]["child"]);
    const priceDiff = parseInt(price) - parseInt(oldPrice);

    function handleClick() {
        if (props.departure) {
            if (props.selected) {
                props.onBookingDepartureFunction(null);
            }
            else {
                props.onBookingDepartureFunction(flight._id);
            }
        }
        else {
            if (props.selected) {
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
                    Departure Terminal: {flight.departureTerminal}
                    <br />
                    <br />
                    Arrival Date : {arrivalDate.getFullYear() + '-' + (arrivalDate.getMonth() + 1) + '-' + arrivalDate.getDate()}
                    <br />
                    Arrival Time: {(arrivalDate.getHours() <= 9 ? "0" + arrivalDate.getHours() : arrivalDate.getHours()) + ':' + (arrivalDate.getMinutes() <= 9 ? "0" + arrivalDate.getMinutes() : arrivalDate.getMinutes())}
                    <br />
                    Arrival Terminal: {flight.arrivalTerminal}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Flight Duration: {(diffHours <= 9 ? "0" + diffHours : diffHours) + ':' + (diffMinutes <= 9 ? "0" + diffMinutes : diffMinutes)}
                    <br />
                    {parseInt(oldPrice) === 0 ? "Price:" + parseInt(price) + "EGP" : priceDiff >= 0 ? "Amount To Pay:"+ parseInt(priceDiff)+ "EGP" : "Price To Refund:"+ (parseInt(priceDiff)*-1)+ "EGP"}
                    <br />
                    Cabin Class: {props.seatClass === "first" ? "First Class" : props.seatClass === 'economy' ? "Economy" : "Business"}
                    <br />
                    Baggage Allowance: {flight.baggageAllowance} Kg
                </Typography>
            </CardContent>

            <CardActions>
                <Button variant="contained" color={props.selected ? "success" : "primary"} onClick={handleClick} size="large"> {props.selected ? "Booked!" : "Book Now"} </Button>
            </CardActions>
        </React.Fragment>
    );

    return (<Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
    </Box>);
}
export default FlightCard;