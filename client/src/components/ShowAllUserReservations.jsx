import React, { Component } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Table, TableBody, TableContainer, Toolbar, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Reservation from "./Reservation";
import Grid from "@mui/material/Grid";


class ShowAllUserReservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        };
        this.deleteReservation = this.deleteReservation.bind(this)
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/reservation/showAllReservations/')
            .then(res => {
                this.setState({
                    reservations: res.data
                })
            })
            .catch(err => {
                console.log('Error in showAllUserReservations');
            })
    };

    deleteReservation(event) {
        axios
            .delete('http://localhost:8000/reservation/delete/' + event.target.name)
            .then(res => {
                let reservationRemoved = res.data;
                console.log(reservationRemoved);
                let newReservations = [];
                this.state.reservations.forEach(function (item) {
                    if (item._id !== reservationRemoved._id)
                        newReservations.push(item);
                })
                this.setState({
                    reservations: newReservations
                })
            })
    }

    render() {
        const theme = createTheme();
        const reservations = this.state.reservations;
        let reservationList;

        if (!reservations) {
            reservationList = "there is no flight record!";
        } else {
            reservationList = reservations.map((reservation) =>
                <Grid item xs={2} sm={4} md={4} key={reservation._id}>
                    <Reservation reservation={reservation} key={reservation._id} deleteFunction={this.deleteReservation}/>
                </Grid>)
        }

        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {reservationList}
            </Grid>
        )
    }
}

export default ShowAllUserReservations;