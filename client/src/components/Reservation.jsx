import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, {Component, useState} from 'react'
import {TableCell, TableRow, Button, tableCellClasses} from "@mui/material";
import DeleteModal from "./DeleteModal";
import { styled } from '@mui/material/styles';
import axios from "axios";
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            depFlight:[],
            retFlight:[]
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/flight/getFlightById/'+ this.props.reservation.returnFlightId)
            .then(res => {
                this.setState({
                    retFlight: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })

        axios
            .get('http://localhost:8000/flight/getFlightById/'+ this.props.reservation.departureFlightId)
            .then(res => {
                this.setState({
                    depFlight: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
            })
    };

    render() {
        const flight=this.state.depFlight;
        const departureDate=new Date(flight.departure);
        const arrivalDate=new Date(flight.arrival);
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
                    {/*<Button  onClick={handleClick} size="large"> {props.selected?"Booked!":"Book Now"} </Button>*/}
                </CardActions>
            </React.Fragment>
        );

        return (<Box sx={{ minWidth: 275 }}>
            <Card sx={{ bgcolor: 'text.disabled' }} variant="outlined">{card}</Card>
        </Box>);
    }
}
export default Reservation;