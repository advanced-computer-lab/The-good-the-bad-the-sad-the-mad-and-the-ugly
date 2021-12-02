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
        const depFlight=this.state.depFlight;
        const retFlight=this.state.retFlight;
        return (
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{}</Button>
                </CardActions>
            </Card>
        )
    }
}
export default Reservation;