import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Component} from "react";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

class UserFlightCard extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const flight=this.props.flight;
        const departureDate=new Date(flight.departure);
        const arrivalDate=new Date(flight.arrival);
        const noOfAdults=this.props.reservation.noOfAdults;
        const noOfChildren=this.props.reservation.noOfChildren;
        const cabinClass=this.props.reservation.cabinClass;
        const departureSeats=this.props.reservation.departureSeats;
        return (
            <Box sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <strong>Flight Number: </strong>{flight.flightNumber}
                        <br/>
                        <strong>Flight Seats : </strong>{departureSeats}
                        <br/>
                        <strong>From</strong>  {flight.from}({flight.departureAirport}) <strong>To</strong> {flight.to}({flight.arrivalAirport})
                        <br/>
                        <strong>Departure : </strong>{departureDate.getFullYear() + '-' + (departureDate.getMonth() + 1) + '-' + departureDate.getDate()} {(departureDate.getHours() <= 9 ? "0" + departureDate.getHours() : departureDate.getHours()) + ':' + (departureDate.getMinutes() <= 9 ? "0" + departureDate.getMinutes() : departureDate.getMinutes())}
                        <br />
                        <strong>Arrival : </strong>{arrivalDate.getFullYear() + '-' + (arrivalDate.getMonth() + 1) + '-' + arrivalDate.getDate()} {(arrivalDate.getHours() <= 9 ? "0" + arrivalDate.getHours() : arrivalDate.getHours()) + ':' + (arrivalDate.getMinutes() <= 9 ? "0" + arrivalDate.getMinutes() : arrivalDate.getMinutes())}
                    </Typography>
                </CardContent>
            </Box>
        );
    }
}
export default UserFlightCard;