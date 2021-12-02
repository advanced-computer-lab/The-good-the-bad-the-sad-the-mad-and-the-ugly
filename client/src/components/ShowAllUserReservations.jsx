import React, { Component } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Table, TableBody, TableContainer, Toolbar, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Reservation from "./Reservation";


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
            reservationList = reservations.map((reservation, k) =>
                <Reservation reservation={reservation} idx={k} key={k} deleteFunction={this.deleteReservation} />
            );
        }

        return (
            <div>

                <Box sx={{ flexGrow: 1}}>
                    <AppBar position="static" sx={{ flexGrow: 1, bgcolor: 'text.secondary' }}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Airline System
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} className="table table-hover">
                        <TableBody>
                            {reservationList}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ShowAllUserReservations;