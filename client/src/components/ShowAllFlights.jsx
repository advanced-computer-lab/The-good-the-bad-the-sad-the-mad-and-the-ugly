import React, {Component} from 'react';
import axios from 'axios';
import FlightHeading from './FlightHeading'
import Flight from './Flight'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Paper, Table, TableBody, TableContainer, Toolbar, Typography} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FlightDetails from "./Flights/FlightDetails";
import {palette} from '@mui/system';
import Container from "@mui/material/Container";


class ShowAllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        };
        this.deleteFlight = this.deleteFlight.bind(this)
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/flight/showAllFlights')
            .then(res => {
                this.setState({
                    flights: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllFLights');
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
        const theme = createTheme();
        const flights = this.state.flights;
        let flightList;

        console.log(flights[1])

        if (!flights) {
            flightList = "there is no flight record!";
        } else {
            flightList = flights.map((flight, k) =>
                <FlightDetails flight={flight} idx={k} key={k} deleteFunction={this.deleteFlight}/>
            );
        }
        console.log(flightList)

        return (
            <div>

                <Container component="main" maxWidth="md" sx={{mb: 4}}>
                    {flightList}
                </Container>
            </div>
        );
    }
}

export default ShowAllFlights;